import { ConfigType, registerAs } from '@nestjs/config';

import { CONFIG } from '@/constants';

export const authConfig = registerAs(CONFIG.AUTH, () => ({
  usernameField: 'email',
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: 60 * 60 * 24, // 초 단위
}));

export type AuthConfigType = ConfigType<typeof authConfig>;
