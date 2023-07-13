export class HttpException extends Error {
  constructor(
    readonly status: number,
    readonly message: string,
    readonly path?: string,
  ) {
    super(message)
  }
}

export default HttpException
