import httpStatus from 'http-status'
import { HttpException } from 'shared'

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(httpStatus.UNAUTHORIZED, message)
  }
}
