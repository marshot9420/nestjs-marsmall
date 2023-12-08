import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { handleException, throwExceptionOrNot } from '@/common';
import { EXCEPTION } from '@/docs';
import { AUTH, User, UserRepository, UserRole } from '@/models';

import { JoinForm } from './dtos';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async join(joinForm: JoinForm): Promise<void> {
    const { email, password, name, phone } = joinForm;

    const existsUser: User = await this.userRepository.findOne({
      where: { email },
      withDeleted: true,
    });

    throwExceptionOrNot(!existsUser, EXCEPTION.AUTH.DUPLICATED_EMAIL);

    try {
      await this.userRepository.insert(
        this.userRepository.create({
          email,
          password: await bcrypt.hash(password, AUTH.SALT),
          name,
          phone,
          role: UserRole.USER,
        }),
      );
    } catch (error) {
      handleException(EXCEPTION.AUTH.JOIN_ERROR);
    }
  }
}
