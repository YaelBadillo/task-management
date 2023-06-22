import { Model } from 'mongoose'

export abstract class MongooseRepository<T> {
  protected abstract model: Model<T>
}
