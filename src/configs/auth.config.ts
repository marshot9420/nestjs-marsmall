import { ConfigType, registerAs } from '@nestjs/config';

import { CONFIG } from '@/constants';

export const authConfig = registerAs(CONFIG.AUTH, () => ({
  usernameField: 'email',
}));

export type AuthConfigType = ConfigType<typeof authConfig>;
