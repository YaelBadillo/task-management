import { Response } from 'express'
import httpStatus from 'http-status'
import { Service } from 'typedi'

import { AuthService } from '@services'
import { AuthCookies } from '@shared/constants'

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
      .cookie(AuthCookies.ACCESS_TOKEN, accessToken, { httpOnly })
      .cookie(AuthCookies.AUTHENTICATED, authenticated)
      .status(httpStatus.OK)
      .send()
  }

  async logOut({ cookies, user }: Requests.Logout, res: Response) {
    const accessToken = cookies.access_token
    await this.authService.logOut(accessToken, user._id)

    Object.values(AuthCookies).forEach(authCookie => {
      res.clearCookie(authCookie)
    })

    res.status(httpStatus.OK).send()
  }
}
