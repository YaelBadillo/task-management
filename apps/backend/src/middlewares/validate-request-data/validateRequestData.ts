import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'
import httpStatus from 'http-status'

export const validateRequestData =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues.map(({ message, path }) => ({
          message,
          path,
        }))

        return res.status(httpStatus.BAD_REQUEST).json({ issues })
      }

      next(new Error('Unexpected error.'))
    }
  }
