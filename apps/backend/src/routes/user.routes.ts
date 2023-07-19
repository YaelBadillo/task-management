import { Express, Router } from 'express'

import Container from 'typedi'

import { UserController } from '@controllers'
import { catchAsync } from '@controllers/utils'

export const register = (app: Express) => {
  const router = Router()

  const userController = Container.get<UserController>(UserController)

  router.get(
    '/',
    catchAsync(userController.getUserProfile.bind(userController)),
  )

  app.use('/api/user-profile', router)
}
