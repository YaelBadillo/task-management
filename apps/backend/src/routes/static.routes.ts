import { Express, Router } from 'express'
import Container from 'typedi'

import { StaticController } from '@controllers'

export const register = (app: Express) => {
  const router = Router()

  const staticController = Container.get<StaticController>(StaticController)

  router.get('/', staticController.serve.bind(staticController))

  app.use(router)
}
