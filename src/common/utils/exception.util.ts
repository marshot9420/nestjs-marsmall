import { HttpException } from '@nestjs/common';

import { IExceptionObject } from '@/docs';

export function handleException(
  { status, message }: IExceptionObject,
  error?: any,
) {
  throw error || new HttpException(message, status);
}

export function throwExceptionOrNot(
  successCondition: boolean | string | number | object,
  exceptionObject: IExceptionObject,
) {
  if (!successCondition) {
    handleException(exceptionObject);
  }
}
