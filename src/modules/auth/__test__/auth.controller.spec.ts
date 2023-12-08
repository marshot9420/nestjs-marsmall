import { Test, TestingModule } from '@nestjs/testing';

import { JoinForm } from '../dtos';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const mockAuthService = {
      join: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
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
});
