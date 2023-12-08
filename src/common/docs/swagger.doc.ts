import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const SwaggerDoc = {
  id(description: string) {
    return applyDecorators(
      ApiProperty({
        description,
        example: 1,
      }),
    );
  },

  createdAt() {
    return applyDecorators(
      ApiPropertyOptional({
        example: '2023-12-08 23:44:23',
        description: '생성일',
      }),
    );
  },

  updatedAt() {
    return applyDecorators(
      ApiPropertyOptional({
        example: '2023-12-09 00:34:52',
        description: '수정일',
      }),
    );
  },
};
