import http from 'http'
import path from 'path'

import express, { Express } from 'express'
import { Config } from 'convict'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import Container from 'typedi'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { Logger, WinstonLogger } from '@utils/logger'
import { registerRoutes } from '@routes'
import { ConfigSchema } from '@config'
import { BaseErrorHandler, ErrorHandler } from '@utils/error-handler'
import { errorCatcher } from '@utils/error-catcher'
import { conditionalMiddleware } from '@utils/conditional-middleware'
import { AuthMiddleware, BaseAuthMiddleware } from '@middlewares/auth'

export class Server {
  private readonly express: Express
  private readonly logger: Logger
  private httpServer?: http.Server

  constructor(private readonly config: Config<ConfigSchema>) {
    this.express = express()
    this.logger = Container.get(WinstonLogger)

    this.setRequestLogger()
    this.express.use(bodyParser.json())
    this.express.use(cookieParser())
    this.express.use(
      express.static(path.join(__dirname, '../../', 'frontend/dist')),
    )
    this.setDevCors()

    const authMiddleware = Container.get<BaseAuthMiddleware>(AuthMiddleware)
    const avoidablePaths = ['auth']
    this.express.use(
      errorCatcher(
        conditionalMiddleware(
          authMiddleware.verify.bind(authMiddleware),
          avoidablePaths,
        ),
      ),
    )

    registerRoutes(this.express)

    const errorHandler = Container.get<BaseErrorHandler>(ErrorHandler)
    this.express.use(errorHandler.log.bind(errorHandler))
    this.express.use(errorHandler.httpException.bind(errorHandler))
    this.express.use(errorHandler.error.bind(errorHandler))
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

  private setRequestLogger() {
    const env = this.config.get('env')
    const devFormat = 'dev'
    const tinyFormat = 'tiny'
    this.express.use(morgan(env === 'development' ? devFormat : tinyFormat))
  }

  private setDevCors() {
    if (this.config.get('env') === 'development') {
      const origin = 'http://localhost:5173'
      const credentials = true
      this.express.use(cors({ origin, credentials }))
    }
  }
}
