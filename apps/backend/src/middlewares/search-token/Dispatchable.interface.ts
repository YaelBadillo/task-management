import { NextFunction, Request, Response } from 'express'

export interface Dispatchable {
  dispatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void | Promise<void>
}
