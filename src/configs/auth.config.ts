import { ConfigType, registerAs } from '@nestjs/config';

import { CONFIG } from '@/constants';

export const authConfig = registerAs(CONFIG.AUTH, () => ({
  usernameField: 'email',
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: 60 * 60 * 24, // 초 단위
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn: 60 * 60 * 24 * 14, // 초 단위
}));

export type AuthConfigType = ConfigType<typeof authConfig>;
