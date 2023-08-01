import { Schema, ObjectId, model } from 'mongoose'

import { config } from '@config'
import { Model, UserModel } from '@database/models'
import { TokenDto } from '@shared/dtos'

export interface Token {
  token: string
  userId: ObjectId
  createdAt?: Date
}

const tokenSchema = new Schema<Token>({
  token: { type: String, required: true, unique: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: UserModel.name,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: config.get('jwt.signOptions.expiresIn'),
  },
})

tokenSchema.statics.toDto = function ({
  token,
  userId,
  createdAt,
}: Token): TokenDto {
  const tokenDto = new TokenDto()
  tokenDto.token = token
  tokenDto.userId = userId
  tokenDto.createdAt = createdAt

  return tokenDto
}

export const TokenModel = model<Token, Model<Token, TokenDto>>(
  'Token',
  tokenSchema,
)
