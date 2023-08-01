import { ObjectId } from 'mongoose'

export class TokenDto {
  token: string
  userId: ObjectId
  createdAt?: Date
}
