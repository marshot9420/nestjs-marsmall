import { Test, TestingModule } from '@nestjs/testing';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { SNSProvider, User, UserRepository, UserRole } from '@/models';

import { JoinForm } from '../dtos';

import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    mockUserRepository = {
      findOne: jest.fn(),
      insert: jest.fn(),
      create: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
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
});
