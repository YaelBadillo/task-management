import mongoose from 'mongoose'

import { MongooseConfig } from './MongooseConfig.interface'

export class MongooseClientFactory {
  static async createClient(config: MongooseConfig) {
    await mongoose.connect(config.uri)
  }
}
