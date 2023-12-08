import { applyDecorators } from '@nestjs/common';

import { UserDoc } from '@/docs';

export const UserResponseDto = {
  userId() {
    return applyDecorators(UserDoc.userId());
  },

  email() {
    return applyDecorators(UserDoc.email());
  },

  password() {
    return applyDecorators(UserDoc.name());
  },

  name() {
    return applyDecorators(UserDoc.name());
  },

  phone() {
    return applyDecorators(UserDoc.phone());
  },

  point() {
    return applyDecorators(UserDoc.point());
  },

  provider() {
    return applyDecorators(UserDoc.provider());
  },

  snsId() {
    return applyDecorators(UserDoc.snsId());
  },
};
