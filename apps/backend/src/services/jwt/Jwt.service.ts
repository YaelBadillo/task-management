import * as jwt from 'jsonwebtoken'
import { Config } from 'convict'
import { Inject, Service } from 'typedi'

import { BaseJwt } from '@services/jwt'
import { ConfigSchema } from '@config'
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@shared/exceptions'

const ErrorNames = {
  TokenExpiredError: 'TokenExpiredError',
  JsonWebTokenError: 'JsonWebTokenError',
  NotBeforeError: 'NotBeforeError',
}

@Service()
export class JwtService extends BaseJwt {
  private readonly jwt = jwt

  constructor(@Inject('config') private readonly config: Config<ConfigSchema>) {
    const secreteKey = config.get('jwt.secretKey')
    const expiresIn = config.get('jwt.signOptions.expiresIn')
    super(secreteKey, expiresIn)
  }

  sign(userName: string): string {
    return this.jwt.sign({ userName }, this.secretKey, {
      expiresIn: this.signOptions.expiresIn,
    })
  }

  verify(token: string) {
    return new Promise((resolve, reject) => {
      this.jwt.verify(token, this.secretKey, (err, decoded) => {
        if (!err) resolve(decoded)

        if (err?.name === ErrorNames.TokenExpiredError)
          reject(
            new UnauthorizedException(
              'JWT has expired: The token provided has expired. Please obtain a new token for accessing this resource.',
            ),
          )

        if (err?.name === ErrorNames.JsonWebTokenError)
          reject(
            new UnauthorizedException(
              'Invalid JWT: The token provided is not valid. Please ensure you are using a well-formed JSON Web Token.',
            ),
          )

        if (err?.name === ErrorNames.NotBeforeError)
          reject(
            new UnauthorizedException(
              "JWT not active: The token is not yet valid to be used. Please check the token's 'not before' claim and ensure it is active.",
            ),
          )

        reject(
          new InternalServerErrorException(
            'An unexpected error occurred while processing your request. Please try again later or contact the system administrator for assistance.',
          ),
        )
      })
    })
  }
}
