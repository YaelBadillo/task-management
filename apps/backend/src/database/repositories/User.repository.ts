import { Inject, Service } from 'typedi'
import { Model } from 'mongoose'

import { MongooseRepository } from './Mongoose.repository'
import { IUser } from '../models'

interface IUserRepository {
  registerUser(newUser: IUser): Promise<void>
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

  async registerUser(newUser: IUser): Promise<void> {
    try {
      const user = new this.model(newUser)
      await user.save()
    } catch (error) {
      throw new Error('User could not be registered')
    }
  }
}
