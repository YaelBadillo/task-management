import { Inject, Service } from 'typedi'
import { Model } from 'mongoose'

import { MongooseRepository } from '@database/repositories/Mongoose.repository'
import { IUser } from '@database/models'
import { InternalServerErrorException } from '@shared/exceptions'

interface IUserRepository {
  register(newUser: IUser): Promise<IUser>
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

  register(newUser: IUser): Promise<IUser> {
    try {
      return this.model.create(newUser)
    } catch (error) {
      throw new InternalServerErrorException('User could not be registered')
    }
  }
}
