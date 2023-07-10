import { HttpException } from '@shared/exceptions/HttpException'
import httpStatus from 'http-status'

export class BadRequestException extends HttpException {
  constructor(message: string, path?: string) {
    super(httpStatus.BAD_REQUEST, message, path)
  }
}
