import Container from 'typedi'

import { config } from '@config'
import { WinstonLogger } from '@utils/logger'
import { TokenModel, UserModel } from '@database/models'
import { Jwt } from '@utils/jwt'

Container.set('config', config)

const winstonLogger = Container.get<WinstonLogger>(WinstonLogger)
Container.set('winston.logger', winstonLogger)

Container.set('user.model', UserModel)
Container.set('token.model', TokenModel)

const jwt = Container.get<Jwt>(Jwt)
Container.set('jsonwebtoken.jwt', jwt)
