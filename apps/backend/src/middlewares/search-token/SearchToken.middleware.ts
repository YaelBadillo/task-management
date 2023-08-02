import { NextFunction, Request, Response } from 'express'
import { Service } from 'typedi'

import { TokenRepository } from '@database/repositories'
import { UnauthorizedException } from '@shared/exceptions'
import { Dispatchable } from '@middlewares/search-token/Dispatchable.interface'

@Service()
export class SearchTokenMiddleware implements Dispatchable {
  constructor(private readonly tokenRepository: TokenRepository) {}

  async dispatch(req: Request, _res: Response, next: NextFunction) {
    const accessToken = req.cookies?.access_token
    const foundToken = await this.tokenRepository.findOneByToken(accessToken)
    if (!foundToken)
      throw new UnauthorizedException(
        'Invalid JWT: The token provided is not valid. Please log in.',
      )

    next()
  }
}
