export class UserDto {
  private _username: string
  private _createdAt?: Date | undefined

  private _updatedAt?: Date | undefined

  constructor() {
    this._username = ''
  }

  public get username(): string {
    return this._username
  }

  public set username(value: string) {
    this._username = value
  }

  public get createdAt(): Date | undefined {
    return this._createdAt
  }

  public set createdAt(value: Date | undefined) {
    this._createdAt = value
  }

  public get updatedAt(): Date | undefined {
    return this._updatedAt
  }

  public set updatedAt(value: Date | undefined) {
    this._updatedAt = value
  }
}
