import { NextFunction, Request, Response } from 'express'

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>

export const catchAsync =
  (handler: AsyncRequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('hola')

      return await handler(req, res, next)
    } catch (error) {
      return next(error)
    }
  }
