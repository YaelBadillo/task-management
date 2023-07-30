import { Inject, Service } from 'typedi'
import { Model } from 'mongoose'

import { MongooseRepository } from '@database/repositories/Mongoose.repository'
import { IUser } from '@database/models'
import { InternalServerErrorException } from '@shared/exceptions'

@Service()
export class UserRepository extends MongooseRepository<IUser> {
  constructor(
    @Inject('user.model')
    protected readonly model: Model<IUser>,
  ) {
    super()
  }

  async findOneByUsername(username: string): Promise<IUser> {
    try {
      const user = await this.model.findOne({ username })
      return user
    } catch (error) {
      throw new InternalServerErrorException(
        `User with the username ${username} could not be found.`,
      )
    }
  }

  async register(newUser: IUser): Promise<IUser> {
    try {
      const registeredUser = await this.model.create<IUser>(newUser)
      return registeredUser
    } catch (error) {
      throw new InternalServerErrorException('User could not be registered.')
    }
  }
}
