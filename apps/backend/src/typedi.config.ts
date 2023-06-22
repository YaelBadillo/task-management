import Container from 'typedi'

import { WinstonLogger } from './utils/logger'
import { User } from './models'

const winstonLogger = Container.get<WinstonLogger>(WinstonLogger)
Container.set('winston.logger', winstonLogger)
Container.set('user.model', User)
