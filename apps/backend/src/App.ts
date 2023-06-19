import Container from 'typedi'

import { Server } from './Server'

export class App {
  private server?: Server

  start() {
    const port = process.env.PORT || '3000'
    this.server = new Server(port)

    return this.server.listen()
  }

  stop() {
    return this.server?.stop()
  }

  get httpServer() {
    return this.server?.server
  }
}
