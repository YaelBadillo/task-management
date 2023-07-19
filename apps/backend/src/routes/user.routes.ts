import { Express, Router } from 'express'

import Container from 'typedi'

import { UserController } from '@controllers'
import { errorCatcher } from '@utils/error-catcher'

export const register = (app: Express) => {
  const router = Router()

  const userController = Container.get<UserController>(UserController)

  router.get(
    '/',
    errorCatcher(userController.getUserProfile.bind(userController)),
  )

  app.use('/api/user-profile', router)
}
