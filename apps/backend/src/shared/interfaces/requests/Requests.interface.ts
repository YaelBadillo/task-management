import { Request } from 'express'
import { LogInUserDto, RegisterUserDto } from 'shared'

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

export interface LogoutRequest extends RequestWithUser {
  cookies: AccessTokenCookie
}

type AccessTokenCookie = {
  access_token?: string
}
