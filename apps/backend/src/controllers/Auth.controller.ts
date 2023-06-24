import { Request, Response } from 'express'
import { Service } from 'typedi'
import httpStatus from 'http-status'

import { UserService } from '@services'
import { RegisterUserDto } from '@shared/dtos'

interface RegisterUserRequest extends Request {
  body: RegisterUserDto
}

@Service()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  async signUp(req: RegisterUserRequest, res: Response) {
    const userDto = await this.userService.registerUser(req.body)

    return res.status(httpStatus.CREATED).json(userDto)
  }
}
