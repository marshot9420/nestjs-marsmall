import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { Response } from 'express';

import { User } from '@/models';

import { JoinForm } from '../dtos';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { CONFIG } from '@/constants';

jest.mock('@/docs/controller-docs/auth.controller.doc.ts', () => ({
  AuthControllerDoc: {
    join: jest.fn(() => () => {}),
    login: jest.fn(() => () => {}),
  },
}));

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const mockAuthService = {
      join: jest.fn(),
      generateAccessToken: jest.fn().mockReturnValue('mockAccessToken'),
      generateRefreshToken: jest.fn().mockReturnValue('mockRefreshToken'),
    };

    const mockConfigService = {
      get: jest.fn().mockImplementation((key) => {
        if (key === CONFIG.AUTH) {
          return {
            refreshTokenExpiresIn: 1209600,
          };
        }
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(
      AuthService,
    ) as jest.Mocked<AuthService>;
  });

  it('컨트롤러가 정의되어야 합니다.', () => {
    expect(controller).toBeDefined();
  });

  describe('join', () => {
    it('JoinForm DTO를 사용해서 AuthService의 join 메서드를 호출해야 합니다.', async () => {
      const joinForm: JoinForm = {
        email: 'test@example.com',
        password: 'Test1234!',
        name: '도회원',
        phone: '01012345678',
      };

      await controller.join(joinForm);

      expect(authService.join).toHaveBeenCalledWith(joinForm);
    });
  });

  describe('login', () => {
    it('로그인 시 액세스 토큰과 리프레시 토큰이 발급되어야 합니다.', async () => {
      const user = { id: 1, email: 'test@example.com' };

      const mockResponse = { cookie: jest.fn() } as Partial<Response>;

      const loginResponse = await controller.login(
        user as User,
        mockResponse as Response,
      );

      expect(authService.generateAccessToken).toHaveBeenCalledWith({
        id: user.id,
      });
      expect(authService.generateRefreshToken).toHaveBeenCalledWith({
        id: user.id,
      });
      expect(mockResponse.cookie).toHaveBeenCalled();
      expect(loginResponse).toHaveProperty('accessToken');
    });
  });
});
