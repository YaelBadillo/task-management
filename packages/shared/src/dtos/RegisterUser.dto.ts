import { BaseUserDto } from './BaseUser.dto'

export class RegisterUserDto extends BaseUserDto {
  passwordConfirm: string = ''
}
