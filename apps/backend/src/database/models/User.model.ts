import { Schema, model } from 'mongoose'

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

export const UserModel = model<IUser>('User', userSchema)
