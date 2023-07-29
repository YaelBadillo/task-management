export class HttpException extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly path?: string,
  ) {
    super(message)
  }
}
