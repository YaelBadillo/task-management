export abstract class Encrypter {
  protected readonly saltRounds: number = 12
  abstract encrypt(password: string): Promise<string>
  abstract compare(password: string, hashedPassword: string): Promise<boolean>
}
