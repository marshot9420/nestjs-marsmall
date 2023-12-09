import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

import { CookieOptions, Response } from 'express';

import { AuthConfigType } from '@/configs';
import { CONFIG, COOKIE } from '@/constants';
import { AuthControllerDoc as Docs } from '@/docs';
import { User } from '@/models';

import { CurrentUser } from './decorator';
import { JoinForm, LoginResponse } from './dtos';
import { LocalAuthGuard } from './guards';
import { IJwtPayload } from './interfaces';

import { AuthService } from './auth.service';

@ApiTags('인증/인가 API')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Docs.join('회원가입')
  @Post('join')
  async join(@Body() joinForm: JoinForm): Promise<void> {
    await this.authService.join(joinForm);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    return this.issueToken(user, res);
  }

  private async setRefreshTokenCookie(payload: IJwtPayload, res: Response) {
    const refreshToken = await this.authService.generateRefreshToken(payload);
    const cookieOptions: CookieOptions = {
      maxAge:
        this.configService.get<AuthConfigType>(CONFIG.AUTH)
          .refreshTokenExpiresIn * 1000,
      httpOnly: true,
      signed: true,
      secure:
        this.configService.get(CONFIG.ENV_KEY.NODE_ENV) !==
        CONFIG.NODE_ENV.DEVELOPMENT,
    };

    res.cookie(COOKIE.REFRESH_TOKEN, refreshToken, cookieOptions);
  }

  private async issueToken(user: User, res: Response): Promise<LoginResponse> {
    const jwtPayload: IJwtPayload = { id: user.id };
    const accessToken = this.authService.generateAccessToken(jwtPayload);

    await this.setRefreshTokenCookie(jwtPayload, res);

    return {
      accessToken,
    };
  }
}
