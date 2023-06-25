import Container from 'typedi'

import { config } from '@config'
import { WinstonLogger } from '@utils/logger'
import { UserModel } from '@database/models'
import { BcryptEncrypter } from '@utils/encrypter'
import { JwtService } from '@utils/jwt'

Container.set('config', config)

const winstonLogger = Container.get<WinstonLogger>(WinstonLogger)
Container.set('winston.logger', winstonLogger)

Container.set('user.model', UserModel)

const bcryptEncrypter = Container.get<BcryptEncrypter>(BcryptEncrypter)
Container.set('bcrypt.encrypter', bcryptEncrypter)

const jwt = Container.get<JwtService>(JwtService)
Container.set('jsonwebtoken.jwt', jwt)
