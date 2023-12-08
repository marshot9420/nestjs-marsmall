import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

import { SwaggerDoc } from '@/common';
import { SNSProvider, USER } from '@/models';

export const UserDoc = {
  userId() {
    return applyDecorators(SwaggerDoc.id('회원 식별자'));
  },

  email() {
    return applyDecorators(
      ApiProperty({
        description: USER.EMAIL.KR,
        example: 'user1@example.com',
      }),
    );
  },

  password() {
    return applyDecorators(
      ApiProperty({
        description: USER.PASSWORD.KR,
        example: 'User1234!',
      }),
    );
  },

  name() {
    return applyDecorators(
      ApiProperty({
        description: '회원의 실명',
        example: '김회원',
      }),
    );
  },

  phone() {
    return applyDecorators(
      ApiProperty({
        description: USER.PHONE.KR,
        example: '01012345678',
      }),
    );
  },

  point() {
    return applyDecorators(
      ApiProperty({
        description: USER.POINT.KR,
        example: 1000,
      }),
    );
  },

  role() {
    return applyDecorators(
      ApiProperty({
        description: USER.ROLE.KR,
        example: 'USER',
      }),
    );
  },

  provider() {
    return applyDecorators(
      Column({
        length: USER.PROVIDER.MAX_LENGTH,
        default: SNSProvider.LOCAL,
      }),
    );
  },

  snsId() {
    return applyDecorators(
      Column({
        nullable: true,
      }),
    );
  },

  refreshToken() {
    return applyDecorators(
      Column({
        nullable: true,
        select: false,
      }),
    );
  },
};
