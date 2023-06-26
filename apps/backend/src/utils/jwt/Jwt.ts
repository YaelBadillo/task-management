interface SignOptions {
  expiresIn: string
}

export abstract class Jwt {
  protected readonly secretKey: string
  protected readonly signOptions: SignOptions

  constructor(secretKey: string, expiresIn: string) {
    this.secretKey = secretKey
    this.signOptions = { expiresIn }
  }

  abstract sign(userName: string): string
}