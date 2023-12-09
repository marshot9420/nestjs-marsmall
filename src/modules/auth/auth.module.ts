import { Module } from '@nestjs/common';

import { CustomTypeOrmModule } from '@/common';
import { UserRepository } from '@/models';

import { strategies } from './strategies';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [CustomTypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService, ...strategies],
  controllers: [AuthController],
})
export class AuthModule {}
