import http from 'http'
import path from 'path'

import express, { Express } from 'express'
import { Config } from 'convict'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import Container from 'typedi'
import cors from 'cors'

import { Logger, WinstonLogger } from '@utils/logger'
import { registerRoutes } from '@routes'
import { ConfigSchema } from '@config'

export class Server {
  private readonly express: Express
  private readonly logger: Logger
  private httpServer?: http.Server

  constructor(private readonly config: Config<ConfigSchema>) {
    this.express = express()
    this.logger = Container.get(WinstonLogger)

    this.express.use(morgan('dev'))
    this.express.use(bodyParser.json())
    this.express.use(
      express.static(path.join(__dirname, '../../', 'frontend/dist')),
    )

    if (config.get('env') === 'development') {
      this.express.use(cors)
    }

    registerRoutes(this.express)
  }

  listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.config.get('port'), () => {
        this.logger.info(`Server listening on port: ${this.config.get('port')}`)

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
