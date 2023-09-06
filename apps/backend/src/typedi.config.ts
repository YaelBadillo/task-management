import Container from 'typedi'

import { config } from '@config'
import { WinstonLogger } from '@utils/logger'
import { TokenModel, UserModel } from '@database/models'

Container.set('config', config)

const winstonLogger = Container.get<WinstonLogger>(WinstonLogger)
Container.set('winston.logger', winstonLogger)

Container.set('user.model', UserModel)
Container.set('token.model', TokenModel)
