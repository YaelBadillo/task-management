interface SignOptions {
  expiresIn: string
}

export abstract class BaseJwt {
  protected readonly secretKey: string
  protected readonly signOptions: SignOptions

  constructor(secretKey: string, expiresIn: string) {
    this.secretKey = secretKey
    this.signOptions = { expiresIn }
  }

  abstract sign(userName: string): string
  abstract verify(token: string): Promise<unknown>
}
