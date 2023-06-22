import Container from 'typedi'

import { WinstonLogger } from './shared/logger'
import { User } from './database/models'

const winstonLogger = Container.get<WinstonLogger>(WinstonLogger)
Container.set('winston.logger', winstonLogger)
Container.set('user.model', User)
