import { HttpException } from '@nestjs/common';

import { IExceptionObject } from '@/docs';

export function handleException(
  { status, message }: IExceptionObject,
  error?: any,
) {
  throw error || new HttpException(message, status);
}

/**
 * 첫 번째 인수로 넘긴 `successCondition`이 `false`일 경우, 예외를 발생시킵니다.
 *
 * (논리형이면 `false`, 문자열이면 empty, 숫자면 0, 객체면 null)
 */
export function throwExceptionOrNot(
  successCondition: boolean | string | number | object,
  exceptionObject: IExceptionObject,
) {
  if (!successCondition) {
    handleException(exceptionObject);
  }
}
