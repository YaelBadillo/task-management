export class UserDto {
  private _name: string
  private _createdAt?: Date | undefined

  private _updatedAt?: Date | undefined

  constructor() {
    this._name = ''
  }

  public get name(): string {
    return this._name
  }

  public set name(value: string) {
    this._name = value
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
