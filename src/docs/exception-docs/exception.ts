import { HttpStatus } from '@nestjs/common';

export interface IExceptionObject {
  status: HttpStatus;
  message: string;
}
