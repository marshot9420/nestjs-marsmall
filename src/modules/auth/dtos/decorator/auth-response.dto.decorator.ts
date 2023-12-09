import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const AuthResponseDto = {
  accessToken() {
    return applyDecorators(
      ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        description: 'JWT Access 토큰',
      }),
    );
  },
};
