import Container from 'typedi'

import { config } from '@config'
import { LoggerService } from '@services'
import { TokenModel, UserModel } from '@database/models'

Container.set('config', config)

const winstonLogger = Container.get<LoggerService>(LoggerService)
Container.set('logger.service', winstonLogger)

Container.set('user.model', UserModel)
Container.set('token.model', TokenModel)
