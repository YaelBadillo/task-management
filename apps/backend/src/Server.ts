import http from 'http'

import express, { Express } from 'express'
import { Config } from 'convict'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import Container from 'typedi'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { Logger, LoggerService } from '@services'
import { registerRoutes } from '@routes'
import { ConfigSchema } from '@config'
import { BaseErrorHandler, ErrorHandler } from '@utils/error-handler'
import { errorCatcher } from '@utils/error-catcher'
import { conditionalMiddleware } from '@utils/conditional-middleware'
import { AuthMiddleware, BaseAuthMiddleware } from '@middlewares/auth'
import { SearchTokenMiddleware } from '@middlewares/search-token'
import { STATIC_PATH } from '@shared/constants/static'
import { ENV, EnvKeys, Envs, PORT } from '@shared/constants/env'
import {
  DEV_CORS_CREDENTIALS,
  DEV_CORS_ORIGIN,
} from '@shared/constants/dev-cors'
import { REQUEST_LOGGER_FORMATS } from '@shared/constants/request-logger-formats'

export class Server {
  private readonly env: EnvKeys
  private readonly port: number
  private readonly express: Express
  private readonly logger: Logger
  private httpServer?: http.Server

  constructor(private readonly config: Config<ConfigSchema>) {
    this.env = this.config.get(ENV)
    this.port = this.config.get(PORT)
    this.express = express()
    this.logger = Container.get(LoggerService)

    this.setRequestLogger()
    this.express.use(bodyParser.json())
    this.express.use(cookieParser())
    this.express.use(express.static(STATIC_PATH))
    this.setDevCors()

    const avoidablePaths = ['login', 'sign-up', '/']
    this.setAuthMiddlewares(avoidablePaths)

    registerRoutes(this.express)

    const errorHandler = Container.get<BaseErrorHandler>(ErrorHandler)
    this.express.use(errorHandler.log.bind(errorHandler))
    this.express.use(errorHandler.httpException.bind(errorHandler))
    this.express.use(errorHandler.error.bind(errorHandler))
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

  private setRequestLogger() {
    this.express.use(
      morgan(
        this.env === Envs.DEVELOPMENT
          ? REQUEST_LOGGER_FORMATS.DEV
          : REQUEST_LOGGER_FORMATS.TINY,
      ),
    )
  }

  private setDevCors() {
    if (this.env === Envs.DEVELOPMENT) {
      this.express.use(
        cors({ origin: DEV_CORS_ORIGIN, credentials: DEV_CORS_CREDENTIALS }),
      )
    }
  }

  private setAuthMiddlewares(avoidablePaths: string[]) {
    const searchTokenMiddleware = Container.get(SearchTokenMiddleware)
    this.express.use(
      errorCatcher(
        conditionalMiddleware(
          searchTokenMiddleware.dispatch.bind(searchTokenMiddleware),
          avoidablePaths,
        ),
      ),
    )

    const authMiddleware = Container.get<BaseAuthMiddleware>(AuthMiddleware)
    this.express.use(
      errorCatcher(
        conditionalMiddleware(
          authMiddleware.verify.bind(authMiddleware),
          avoidablePaths,
        ),
      ),
    )
  }
}
