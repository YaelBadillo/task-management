import httpStatus from 'http-status'

import { HttpException } from '@shared/exceptions/HttpException'

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(httpStatus.INTERNAL_SERVER_ERROR, message)
  }
}
