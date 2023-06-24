import { Model } from 'mongoose'

export abstract class MongooseRepository<T> {
  protected abstract model: Model<T>

  protected save(schema: T): Promise<T> {
    return this.getModelInstance(schema).save()
  }

  private getModelInstance(schema: T) {
    return new this.model(schema)
  }
}
