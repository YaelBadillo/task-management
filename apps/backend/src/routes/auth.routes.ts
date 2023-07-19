import { Express, Router } from 'express'
import Container from 'typedi'

import { AuthController } from '@controllers'
import { validateRequestData } from '@middlewares/validate-request-data'
import { RegisterUserSchema } from '../shared/schemas/user'
import { errorCatcher } from '@utils/error-catcher'

export const register = (app: Express) => {
  const router = Router()

  const authController = Container.get<AuthController>(AuthController)

  router.post(
    '/auth/sign-up',
    [validateRequestData(RegisterUserSchema)],
    errorCatcher(authController.signUp.bind(authController)),
  )

  router.post(
    '/auth/login',
    errorCatcher(authController.logIn.bind(authController)),
  )

  app.use('/api', router)
}
