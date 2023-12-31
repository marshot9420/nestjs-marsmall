import { HttpStatus } from '@nestjs/common';

export interface IExceptionObject {
  status: HttpStatus;
  message: string;
}

export const EXCEPTION = {
  COMMON: {
    FORBIDDEN: {
      status: HttpStatus.FORBIDDEN,
      message: '해당 요청에 대한 권한이 없습니다.',
    },
    INTERNAL_SERVER_ERROR: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '알 수 없는 서버 오류가 발생했습니다.',
    },
  },

  AUTH: {
    DUPLICATED_EMAIL: {
      status: HttpStatus.BAD_REQUEST,
      message: '이미 존재하는 이메일입니다.',
    },
    JOIN_ERROR: {
      status: HttpStatus.BAD_REQUEST,
      message: '회원가입 중 알 수 없는 오류가 발생했습니다.',
    },
  },
};
