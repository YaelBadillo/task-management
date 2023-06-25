import { Request, Response } from 'express'
import { Service } from 'typedi'
import httpStatus from 'http-status'

import { UserService } from '@services'
import { LogInUserDto, RegisterUserDto } from '@shared/dtos'

interface RegisterUserRequest extends Request {
  body: RegisterUserDto
}

interface LogInUserRequest extends Request {
  body: LogInUserDto
}

@Service()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  async signUp(req: RegisterUserRequest, res: Response) {
    await this.userService.registerUser(req.body)

    return res.status(httpStatus.CREATED).send()
  }

  async logIn(req: LogInUserRequest, res: Response) {
    const token = await this.userService.logIn(req.body)

    return res.status(httpStatus.OK).json(token)
  }
}
