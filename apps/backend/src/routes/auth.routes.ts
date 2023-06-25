import { Express, Router } from 'express'
import Container from 'typedi'

import { AuthController } from '@controllers'
import { validate } from '@middlewares'
import { RegisterUserSchema } from '../shared/schemas/user'
import { catchAsync } from '@controllers/utils'

export const register = (app: Express) => {
  const router = Router()

  const authController = Container.get<AuthController>(AuthController)

  router.post(
    '/auth/signup',
    [validate(RegisterUserSchema)],
    catchAsync(authController.signUp.bind(authController)),
  )

  router.post(
    '/auth/login',
    catchAsync(authController.logIn.bind(authController)),
  )

  app.use('/api', router)
}
