import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { CustomTypeOrmModule } from '@/common';
import { AuthConfigType } from '@/configs';
import { CONFIG } from '@/constants';
import { UserRepository } from '@/models';

import { UsersModule } from '../users';

import { strategies } from './strategies';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    CustomTypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<AuthConfigType>(CONFIG.AUTH)
          .accessTokenSecret,
        signOptions: {
          expiresIn: configService.get<AuthConfigType>(CONFIG.AUTH)
            .accessTokenExpiresIn,
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [Logger, AuthService, ...strategies],
  controllers: [AuthController],
})
export class AuthModule {}
