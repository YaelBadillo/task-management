import Container from 'typedi'
import { Config } from 'convict'

import { ConfigSchema } from '@config'
import { Server } from './Server'

export class App {
  private server?: Server

  start() {
    const config = Container.get<Config<ConfigSchema>>('config')
    this.server = new Server(config)

    return this.server.listen()
  }

  stop() {
    return this.server?.stop()
  }

  get httpServer() {
    return this.server?.server
  }
}
