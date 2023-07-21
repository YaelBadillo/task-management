import httpStatus from 'http-status'
import { HttpException } from 'shared'

export class BadRequestException extends HttpException {
  constructor(message: string, path?: string) {
    super(httpStatus.BAD_REQUEST, message, path)
  }
}
