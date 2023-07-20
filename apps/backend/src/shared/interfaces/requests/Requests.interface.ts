import { Request } from 'express'

import { LogInUserDto, RegisterUserDto } from '@shared/dtos'
import { IUser } from '@database/models'

export interface RegisterUserRequest extends Request {
  body: RegisterUserDto
}

export interface LogInUserRequest extends Request {
  body: LogInUserDto
}

export interface RequestWithUser extends Request {
  user?: IUser
}
