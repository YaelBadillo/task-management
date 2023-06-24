import { Schema, model } from 'mongoose'

import { Model } from '@database/models/Model.interface'
import { UserDto } from '@shared/dtos'

export interface IUser {
  name: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, max: 20, unique: true },
  password: { type: String, required: true, max: 30 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

userSchema.statics.toDto = function ({
  name,
  createdAt,
  updatedAt,
}: IUser): UserDto {
  const userDto = new UserDto()
  userDto.name = name
  userDto.createdAt = createdAt
  userDto.updatedAt = updatedAt

  return userDto
}

export const UserModel = model<IUser, Model<IUser, UserDto>>('User', userSchema)
