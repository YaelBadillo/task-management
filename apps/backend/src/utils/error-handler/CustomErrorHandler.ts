import { NextFunction, Request, Response } from 'express'
import { HttpException } from 'http-exception'
import httpStatus from 'http-status'
import { Inject, Service } from 'typedi'

import { ErrorHandler } from '@utils/error-handler/ErrorHandler'
import { Logger } from '@utils/logger'

@Service()
export class CustomErrorHandler extends ErrorHandler {
  constructor(@Inject('winston.logger') protected readonly logger: Logger) {
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
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    })
  }
}
