import { ApiProperty } from '@nestjs/swagger';

import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonEntity {
  @ApiProperty({
    example: '2023-11-23:01:28:02',
    description: '생성일',
    required: true,
  })
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty({
    example: '2023-11-23:07:28:02',
    description: '수정일',
  })
  @UpdateDateColumn()
  updatedAt?: Date;
}
