import http from 'http'

import express, { Express } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import Container from 'typedi'

import { Logger, WinstonLogger } from './utils/encrypter/logger'
import { registerRoutes } from './routes'

export class Server {
  private readonly express: Express
  private readonly logger: Logger
  private httpServer?: http.Server

  constructor(private readonly port: string) {
    this.express = express()
    this.logger = Container.get(WinstonLogger)

    this.express.use(morgan('dev'))
    this.express.use(bodyParser.json())

    registerRoutes(this.express)
  }

  listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.info(`Server listening on port: ${this.port}`)

        return resolve()
      })
    })
  }

  stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error)
          }

          return resolve()
        })
      }

      return resolve()
    })
  }

  get server() {
    return this.httpServer
  }
}
