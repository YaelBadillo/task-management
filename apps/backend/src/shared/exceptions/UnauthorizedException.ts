import { HttpException } from 'http-exception'
import httpStatus from 'http-status'

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(httpStatus.UNAUTHORIZED, message)
  }
}
