import mongoose from 'mongoose'

import { MongooseConfig } from '@shared/mongoose/MongooseConfig.interface'

export class MongooseClientFactory {
  static async createClient(config: MongooseConfig) {
    await mongoose.connect(config.uri)
  }
}
