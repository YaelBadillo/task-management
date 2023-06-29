import 'reflect-metadata'
import 'module-alias/register'

import './typedi.config'

import { App } from '@app'
import { MongooseClientFactory } from '@shared/mongoose'
import { config } from '@config'

try {
  new App().start().catch(handleError)
  MongooseClientFactory.createClient(config.get('mongodb')).catch(handleError)
} catch (e) {
  handleError(e)
}

process.on('uncaughtException', err => {
  console.error('uncaughtException', err)
  process.exit(1)
})

function handleError(e: any) {
  console.error(e)
  process.exit(1)
}
