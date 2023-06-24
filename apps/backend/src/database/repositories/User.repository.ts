import { Inject, Service } from 'typedi'
import { Model } from 'mongoose'

import { MongooseRepository } from '@database/repositories/Mongoose.repository'
import { IUser } from '@database/models'
import { InternalServerErrorException } from '@shared/exceptions'

interface IUserRepository {
  registerUser(newUser: IUser): Promise<IUser | void>
}

@Service()
export class UserRepository
  extends MongooseRepository<IUser>
  implements IUserRepository
{
  constructor(
    @Inject('user.model')
    protected readonly model: Model<IUser>,
  ) {
    super()
  }

  registerUser(newUser: IUser) {
    try {
      return this.save(newUser)
    } catch (error) {
      throw new InternalServerErrorException('User could not be registered')
    }
  }
}
