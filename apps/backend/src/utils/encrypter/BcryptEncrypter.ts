import { Service } from 'typedi'
import * as bcrypt from 'bcrypt'

import { Encrypter } from '@utils/encrypter'

@Service()
export class BcryptEncrypter extends Encrypter {
  private readonly bcrypt = bcrypt

  encrypt(password: string): Promise<string> {
    try {
      return this.bcrypt.hash(password, this.saltRounds)
    } catch (_) {
      throw new Error('Password could not be encrypted')
    }
  }
  compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return this.bcrypt.compare(password, hashedPassword)
    } catch (_) {
      throw new Error('Passwords could not be compared')
    }
  }
}
