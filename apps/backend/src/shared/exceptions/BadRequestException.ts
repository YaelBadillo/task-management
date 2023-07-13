import { HttpException } from 'http-exception'
import httpStatus from 'http-status'

export class BadRequestException extends HttpException {
  constructor(message: string, path?: string) {
    super(httpStatus.BAD_REQUEST, message, path)
  }
}
