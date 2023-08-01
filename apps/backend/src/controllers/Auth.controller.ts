import { Request, Response } from 'express'
import { Service } from 'typedi'
import httpStatus from 'http-status'

import { AuthService } from '@services'
import {
  LogInUserRequest,
  RegisterUserRequest,
} from '@shared/interfaces/requests'

@Service()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signUp(req: RegisterUserRequest, res: Response) {
    await this.authService.registerUser(req.body)

    return res.status(httpStatus.CREATED).send()
  }

  async logIn(req: LogInUserRequest, res: Response) {
    const accessToken = await this.authService.logIn(req.body)
    const authenticated = true
    const httpOnly = true

    res
      .cookie('access_token', accessToken, { httpOnly })
      .cookie('authenticated', authenticated)
      .status(httpStatus.OK)
      .send()
  }

  logout(_req: Request, res: Response) {
    const accessToken = ''
    const authenticated = false
    const httpOnly = true

    res
      .cookie('access_token', accessToken, { httpOnly })
      .cookie('authenticated', authenticated)
      .status(httpStatus.OK)
      .send()
  }
}
