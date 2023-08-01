import { Inject, Service } from 'typedi'
import { Model, ObjectId } from 'mongoose'

import { MongooseRepository } from '@database/repositories/Mongoose.repository'
import { Token } from '@database/models'
import { InternalServerErrorException } from '@shared/exceptions'

@Service()
export class TokenRepository extends MongooseRepository<Token> {
  constructor(
    @Inject('user.model')
    protected readonly model: Model<Token>,
  ) {
    super()
  }

  async register(token: string, userId: ObjectId) {
    try {
      const registeredToken = await this.model.create<Token>({ token, userId })
      return registeredToken
    } catch (error) {
      throw new InternalServerErrorException('Token could not be registered.')
    }
  }

  async findOneByTokenAndUserId(token: string, userId: ObjectId) {
    try {
      const foundToken = await this.model.findOne({ token, userId })
      return foundToken
    } catch (error) {
      throw new InternalServerErrorException('Token could not be found.')
    }
  }
}
