import { HttpException } from 'http-exception'
import httpStatus from 'http-status'

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(httpStatus.INTERNAL_SERVER_ERROR, message)
  }
}
