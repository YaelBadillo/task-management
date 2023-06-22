import Container from 'typedi'

import { WinstonLogger } from './utils/logger'
import { UserModel } from './database/models'
import { BcryptEncrypter } from './utils/encrypter'

const winstonLogger = Container.get<WinstonLogger>(WinstonLogger)
Container.set('winston.logger', winstonLogger)

Container.set('user.model', UserModel)

const bcryptEncrypter = Container.get<BcryptEncrypter>(BcryptEncrypter)
Container.set('bcrypt.encrypter', bcryptEncrypter)
