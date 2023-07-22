import { NextFunction, Request, Response } from 'express'

import { Jwt } from '@utils/jwt'
import { BadRequestException } from '@shared/exceptions'

interface RequestWithUser extends Request {
  user?: unknown
}

export abstract class BaseAuthMiddleware {
  protected abstract readonly jwt: Jwt

  async verify(req: RequestWithUser, _res: Response, next: NextFunction) {
    const accessToken = req.cookies?.access_token
    if (!accessToken)
      throw new BadRequestException(
        'Missing JWT: The required JSON Web Token is missing from the request cookies. Please include a valid token in the cookies to access this resource.',
      )

    const decoded = await this.jwt.verify(accessToken)
    const user = await this.validate(decoded)

    req.user = user

    next()
  }

  protected abstract validate(payload: unknown): Promise<unknown>
}
