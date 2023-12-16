import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import * as bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';

import { CONFIG } from '@/constants';
import { AUTH, SNSProvider, User, UserRepository, UserRole } from '@/models';

import { JoinForm } from '../dtos';

import { AuthService } from '../auth.service';
import { IJwtPayload } from '../interfaces';

jest.mock(
  '@/modules/users/dtos/decorators/user-request.dto.decorator.ts',
  () => ({
    UserRequestDto: {
      email: jest.fn(() => () => {}),
      password: jest.fn(() => () => {}),
      name: jest.fn(() => () => {}),
      phone: jest.fn(() => () => {}),
      point: jest.fn(() => () => {}),
      provider: jest.fn(() => () => {}),
      snsId: jest.fn(() => () => {}),
    },
  }),
);

jest.mock('@/docs/controller-docs/auth.controller.doc.ts', () => ({
  AuthControllerDoc: {
    join: jest.fn(() => () => {}),
    login: jest.fn(() => () => {}),
  },
}));

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<UserRepository>;
  let mockConfigService: jest.Mocked<ConfigService>;
  let mockJwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    mockUserRepository = {
      findOne: jest.fn(),
      insert: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findWithPassword: jest.fn(),
    } as any;

    mockConfigService = {
      get: jest.fn().mockImplementation((key) => {
        if (key === CONFIG.AUTH) {
          return {
            usernameField: 'email',
            accessTokenSecret:
              process.env.JWT_ACCESS_TOKEN_SECRET ||
              'hardcodedAccessTokenSecret',
            accessTokenExpiresIn: 60 * 60 * 24, // 초 단위
            refreshTokenSecret:
              process.env.JWT_REFRESH_TOKEN_SECRET ||
              'hardcodedRefreshTokenSecret',
            refreshTokenExpiresIn: 60 * 60 * 24 * 14, // 초 단위
          };
        }
        return null;
      }),
    } as any;

    mockJwtService = {
      sign: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);

    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => Promise.resolve('hashedPassword'));
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));
  });

  describe('join', () => {
    it('새로운 사용자가 생성되어야 합니다.', async () => {
      const joinForm: JoinForm = {
        email: 'test@example.com',
        password: 'Test1234!',
        name: '도회원',
        phone: '01012345678',
      };

      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => Promise.resolve('hashedPassword'));

      const newUser: User = {
        ...joinForm,
        id: 1,
        point: 0,
        role: UserRole.USER,
        provider: SNSProvider.LOCAL,
        snsId: null,
        refreshToken: null,
        deletedAt: null,
      };

      mockUserRepository.findOne.mockResolvedValueOnce(null);
      mockUserRepository.create.mockReturnValueOnce(newUser);

      await authService.join(joinForm);

      newUser.password = 'hashedPassword';

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: joinForm.email },
        withDeleted: true,
      });
      expect(mockUserRepository.insert).toHaveBeenCalledWith({
        ...newUser,
        password: 'hashedPassword',
      });
    });

    it('이미 존재하는 이메일일 경우 에러를 던집니다.', async () => {
      const joinForm: JoinForm = {
        email: 'test@example.com',
        password: 'Test1234!',
        name: '도회원',
        phone: '01012345678',
      };

      const existsUser: User = {
        ...joinForm,
        id: 1,
        point: 0,
        role: UserRole.USER,
        provider: SNSProvider.LOCAL,
        snsId: null,
        refreshToken: null,
        deletedAt: null,
      };

      mockUserRepository.findOne.mockResolvedValueOnce(existsUser);

      await expect(authService.join(joinForm)).rejects.toThrowError(
        '이미 존재하는 이메일입니다.',
      );
    });

    it('사용자 생성 중에 발생한 예외를 처리해야 합니다.', async () => {
      const joinForm: JoinForm = {
        email: 'test@example.com',
        password: 'Test1234!',
        name: '도회원',
        phone: '01012345678',
      };

      mockUserRepository.findOne.mockResolvedValueOnce(null);
      mockUserRepository.create.mockReturnValueOnce({
        ...joinForm,
        id: 1,
        point: 0,
        role: UserRole.USER,
        provider: SNSProvider.LOCAL,
        snsId: null,
        refreshToken: null,
        deletedAt: null,
      });
      mockUserRepository.insert.mockRejectedValueOnce(
        new Error('회원가입 에러'),
      );

      await expect(authService.join(joinForm)).rejects.toThrowError(
        '회원가입 중 알 수 없는 오류가 발생했습니다.',
      );
    });
  });

  describe('validateLocalUser', () => {
    it('이메일과 비밀번호가 일치하는 사용자가 있어야 합니다.', async () => {
      const email = 'test@example.com';
      const password = 'Test1234!';
      const hashedPassword = await bcrypt.hash(password, AUTH.SALT);
      const user: User = {
        id: 1,
        email,
        password: hashedPassword,
        name: '도회원',
        phone: '01012345678',
        point: 0,
        role: UserRole.USER,
        provider: SNSProvider.LOCAL,
        snsId: null,
        refreshToken: null,
        deletedAt: null,
      };

      mockUserRepository.findWithPassword.mockResolvedValueOnce({
        ...user,
        password: hashedPassword,
      });
      mockJwtService.sign.mockReturnValue('generatedJwtToken');

      const result = await authService.validateLocalUser(email, password);

      expect(result).toBeDefined();
      expect(result.id).toEqual(user.id);
      expect(mockUserRepository.findWithPassword).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);

      const jwtPayload: IJwtPayload = { id: user.id };
      const token = authService.generateAccessToken(jwtPayload);

      expect(mockJwtService.sign).toHaveBeenCalledWith(jwtPayload, {
        secret: 'hardcodedAccessTokenSecret',
        expiresIn: 86400,
      });

      expect(token).toEqual('generatedJwtToken');
    });
  });

  describe('generateAccessToken', () => {
    it('사용자 ID로 JWT 액세스 토큰을 생성해야 합니다.', () => {
      const jwtPayload: IJwtPayload = { id: 1 };
      mockJwtService.sign.mockReturnValue('generatedAccessToken');

      const token = authService.generateAccessToken(jwtPayload);

      expect(token).toBe('generatedAccessToken');
      expect(mockJwtService.sign).toHaveBeenCalledWith(jwtPayload, {
        secret: 'hardcodedAccessTokenSecret',
        expiresIn: 86400,
      });
    });
  });

  describe('generateRefreshToken', () => {
    it('사용자 ID로 JWT 리프레시 토큰을 생성하고 데이터베이스에 저장합니다.', async () => {
      const jwtPayload: IJwtPayload = { id: 1 };
      const refreshToken = 'generatedRefreshToken';
      const hashedRefreshToken = 'hashedRefreshToken';

      mockJwtService.sign.mockReturnValue(refreshToken);
      mockConfigService.get.mockImplementation((key) => {
        if (key === CONFIG.AUTH) {
          return {
            refreshTokenSecret: 'hardcodedRefreshTokenSecret',
            refreshTokenExpiresIn: 1209600,
          };
        }
        return null;
      });

      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => Promise.resolve(hashedRefreshToken));

      mockUserRepository.update.mockResolvedValue({
        affected: 1,
      } as UpdateResult);

      const token = await authService.generateRefreshToken(jwtPayload);

      expect(token).toBe(refreshToken);
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        {
          id: jwtPayload.id,
        },
        {
          secret: 'hardcodedRefreshTokenSecret',
          expiresIn: 1209600,
        },
      );
      expect(bcrypt.hash).toHaveBeenCalledWith(refreshToken, AUTH.SALT);
      expect(mockUserRepository.update).toHaveBeenCalledWith(jwtPayload.id, {
        refreshToken: hashedRefreshToken,
      });
    });
  });
});
