import { UserRequestDto } from '@/modules/users';

export class LoginForm {
  @UserRequestDto.email()
  email: string;

  @UserRequestDto.password()
  password: string;
}
