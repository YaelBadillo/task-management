export class RegisterUserDto {
  private _name: string
  private _password: string

  constructor() {
    this._name = ''
    this._password = ''
  }

  public get name(): string {
    return this._name
  }

  public set name(value: string) {
    this._name = value
  }

  public get password(): string {
    return this._password
  }

  public set password(value: string) {
    this._password = value
  }
}
