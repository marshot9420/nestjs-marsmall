import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthControllerDoc as Docs } from '@/docs';

import { JoinForm } from './dtos';

import { AuthService } from './auth.service';

@ApiTags('인증/인가 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Docs.join('회원가입')
  @Post('join')
  async join(@Body() joinForm: JoinForm): Promise<void> {
    await this.authService.join(joinForm);
  }
}
