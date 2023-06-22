import Container from 'typedi'

import { WinstonLogger } from './shared/logger'
import { User } from './database/models'
import { BcryptEncrypter } from './shared/encrypter'

const winstonLogger = Container.get<WinstonLogger>(WinstonLogger)
Container.set('winston.logger', winstonLogger)

Container.set('user.model', User)

const bcryptEncrypter = Container.get<BcryptEncrypter>(BcryptEncrypter)
Container.set('bcrypt.encrypter', bcryptEncrypter)
