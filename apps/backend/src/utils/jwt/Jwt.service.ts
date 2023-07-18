import * as jwt from 'jsonwebtoken'
import { Config } from 'convict'
import { Inject, Service } from 'typedi'

import { Jwt } from '@utils/jwt/Jwt'
import { ConfigSchema } from '@config'

@Service()
export class JwtService extends Jwt {
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
        if (err) return reject(err)

        resolve(decoded)
      })
    })
  }
}
