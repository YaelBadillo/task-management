import { BaseUserDto } from '@shared/dtos/BaseUser.dto'

export class RegisterUserDto extends BaseUserDto {
  passwordConfirm: string
}
