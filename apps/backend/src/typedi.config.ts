import Container from 'typedi'

import { WinstonLogger } from './utils/logger'

const winstonLogger = Container.get<WinstonLogger>(WinstonLogger)
Container.set('winston.logger', winstonLogger)
