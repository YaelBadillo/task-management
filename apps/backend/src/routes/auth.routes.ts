import { Express, Router } from 'express'
import Container from 'typedi'

import { AuthController } from '../controllers'

export const register = (app: Express) => {
  const router = Router()

  const authController = Container.get<AuthController>(AuthController)

  router.post('/auth/signup', authController.signUp.bind(authController))

  app.use('/api', router)
}
