import { Model as MongooseModel } from 'mongoose'

export interface Model<T, U> extends MongooseModel<T> {
  toDto(userModel: T): U
}
