import { NextFunction, Request, Response } from 'express'

import { Jwt } from '@utils/jwt'
import { BadRequestException } from '@shared/exceptions'

interface RequestWithUser extends Request {
  user: unknown
}

export abstract class BaseAuthMiddleware {
  protected abstract readonly jwtService: Jwt

  async verify(req: RequestWithUser, _res: Response, next: NextFunction) {
    const accessToken = req.cookies?.access_token
    if (!accessToken)
      throw new BadRequestException(
        'Token not provided, please provide a token.',
      )

    const decoded = this.jwtService.verify(accessToken)
    const user = await this.validate(decoded)

    req.user = user

    next()
  }

  protected abstract validate(payload: unknown): Promise<unknown>
}
