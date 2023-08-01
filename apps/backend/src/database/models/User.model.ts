import { Schema, model } from 'mongoose'
import { UserDto } from 'shared'

import { Model } from '@database/models'

export interface IUser {
  username: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, max: 20, unique: true },
  password: { type: String, required: true, max: 30 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

userSchema.statics.toDto = function ({
  username,
  createdAt,
  updatedAt,
}: IUser): UserDto {
  const userDto = new UserDto()
  userDto.username = username
  userDto.createdAt = createdAt
  userDto.updatedAt = updatedAt

  return userDto
}

export const UserModel = model<IUser, Model<IUser, UserDto>>('User', userSchema)
