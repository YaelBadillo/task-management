import { Response } from 'express'
import httpStatus from 'http-status'
import { Service } from 'typedi'

import { AuthService } from '@services'
import { AUTHENTICATED, AuthCookies, HTTP_ONLY } from '@shared/constants/auth'

@Service()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signUp(req: Requests.RegisterUser, res: Response) {
    await this.authService.registerUser(req.body)

    return res.status(httpStatus.CREATED).send()
  }

  async logIn(req: Requests.LogInUser, res: Response) {
    const accessToken = await this.authService.logIn(req.body)

    res
      .cookie(AuthCookies.ACCESS_TOKEN, accessToken, { httpOnly: HTTP_ONLY })
      .cookie(AuthCookies.AUTHENTICATED, AUTHENTICATED)
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
