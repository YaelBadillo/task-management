import { Response } from 'express'
import httpStatus from 'http-status'
import { Service } from 'typedi'

import { AuthService } from '@services'

@Service()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signUp(req: Requests.RegisterUser, res: Response) {
    await this.authService.registerUser(req.body)

    return res.status(httpStatus.CREATED).send()
  }

  async logIn(req: Requests.LogInUser, res: Response) {
    const accessToken = await this.authService.logIn(req.body)
    const authenticated = true
    const httpOnly = true

    res
      .cookie('access_token', accessToken, { httpOnly })
      .cookie('authenticated', authenticated)
      .status(httpStatus.OK)
      .send()
  }

  async logOut({ cookies, user }: Requests.Logout, res: Response) {
    const { access_token: accessToken } = cookies
    const { _id: userId } = user
    await this.authService.logOut(accessToken, userId)

    Object.keys(cookies).forEach(cookie => {
      res.clearCookie(cookie)
    })

    res.status(httpStatus.OK).send()
  }
}
