import { NextFunction, Request, RequestHandler, Response } from 'express'

export const catchAsync =
  (handler: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await Promise.resolve(handler(req, res, next))
    } catch (error) {
      return next(error)
    }
  }
