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
import { ErrorHandler, CustomErrorHandler } from '@utils/error-handler'
import { catchAsync } from '@controllers/utils'
import { conditionalMiddleware } from '@utils/conditional-middleware'
import { AuthMiddleware, BaseAuthMiddleware } from '@middlewares'

export class Server {
  private readonly express: Express
  private readonly logger: Logger
  private httpServer?: http.Server

  constructor(private readonly config: Config<ConfigSchema>) {
    this.express = express()
    this.logger = Container.get(WinstonLogger)

    this.express.use(morgan('dev'))
    this.express.use(bodyParser.json())
    this.express.use(cookieParser())
    this.express.use(
      express.static(path.join(__dirname, '../../', 'frontend/dist')),
    )
    this.setDevCors()

    const authMiddleware = Container.get<BaseAuthMiddleware>(AuthMiddleware)
    this.express.use(
      catchAsync(
        conditionalMiddleware(authMiddleware.verify.bind(authMiddleware), [
          'auth',
        ]),
      ),
    )

    registerRoutes(this.express)

    const errorHandler = Container.get<ErrorHandler>(CustomErrorHandler)
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

  private setDevCors() {
    if (this.config.get('env') === 'development') {
      this.express.use(
        cors({ origin: 'http://localhost:5173', credentials: true }),
      )
    }
  }
}
