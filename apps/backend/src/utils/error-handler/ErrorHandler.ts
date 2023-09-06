import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { HttpException } from 'shared'
import { Inject, Service } from 'typedi'
import { Config } from 'convict'

import { BaseErrorHandler } from '@utils/error-handler'
import { Logger } from '@services'
import { ConfigSchema } from '@config'
import { ENV, environments } from '@shared/constants/env'

@Service()
export class ErrorHandler extends BaseErrorHandler {
  constructor(
    @Inject('logger.service') protected readonly logger: Logger,
    @Inject('config') private readonly config: Config<ConfigSchema>,
  ) {
    super()
  }

  httpException(err: Error, _req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpException) {
      return res.status(err.status).json({
        status: err.status,
        message: err.message,
        path: err.path,
      })
    }

    return next(err)
  }

  error(err: Error, _req: Request, res: Response, _next: NextFunction) {
    const env = this.config.get(ENV)
    if (env === environments.DEVELOPMENT) console.error(err.stack)

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    })
  }
}
