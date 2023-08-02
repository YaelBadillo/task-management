import { Inject, Service } from 'typedi'
import { Model, ObjectId } from 'mongoose'

import { MongooseRepository } from '@database/repositories/Mongoose.repository'
import { Token } from '@database/models'
import { InternalServerErrorException } from '@shared/exceptions'

@Service()
export class TokenRepository extends MongooseRepository<Token> {
  constructor(
    @Inject('token.model')
    protected readonly model: Model<Token>,
  ) {
    super()
  }

  async register(token: string, userId: ObjectId): Promise<Token> {
    try {
      const registeredToken = await this.model.create<Token>({ token, userId })
      return registeredToken
    } catch (error) {
      throw new InternalServerErrorException('Token could not be registered.')
    }
  }

  async findOneByUserId(userId: ObjectId): Promise<Token> {
    try {
      const foundToken = await this.model.findOne({ userId })
      return foundToken
    } catch (error) {
      throw new InternalServerErrorException('Token could not be found.')
    }
  }

  async deleteOneByTokenAndUserId(token: string, userId: ObjectId) {
    try {
      const deleteResult = await this.model.deleteOne({ token, userId })
      return deleteResult
    } catch (error) {
      throw new InternalServerErrorException('Token could not be deleted.')
    }
  }
  async findOneByToken(token: string): Promise<Token> {
    try {
      const foundToken = await this.model.findOne({ token })
      return foundToken
    } catch (error) {
      throw new InternalServerErrorException('Token could not be found.')
    }
  }
}
