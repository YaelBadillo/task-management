import { Express, Router } from 'express'
import Container from 'typedi'

import { AuthController } from '@controllers'
import { validate } from '@middlewares'
import { RegisterUserSchema } from '../shared/schemas/user'

export const register = (app: Express) => {
  const router = Router()

  const authController = Container.get<AuthController>(AuthController)

  router.post(
    '/auth/signup',
    [validate(RegisterUserSchema)],
    authController.signUp.bind(authController),
  )

  app.use('/api', router)
}
