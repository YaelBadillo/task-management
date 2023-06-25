import convict from 'convict'

export type ConfigSchema = {
  env: string
  port: number
  mongodb: {
    uri: string
  }
  jwt: {
    secretKey: string
    signOptions: {
      expiresIn: string
    }
  }
}

export const config = convict<ConfigSchema>({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The application port',
    format: Number,
    default: 3000,
    env: 'PORT',
  },
  mongodb: {
    uri: {
      doc: 'The database URI',
      format: String,
      default: 'mongodb://127.0.0.1:27017/test',
      env: 'MONGO_URI',
    },
  },
  jwt: {
    secretKey: {
      doc: 'Secret key',
      format: String,
      default: 'MY SUPER SECRET KEY',
      env: 'JWT_SECRETE',
    },
    signOptions: {
      expiresIn: {
        doc: 'Token time to expire',
        format: String,
        default: '1d',
        env: 'JWT_EXPIRES_IN',
      },
    },
  },
})

config.loadFile([
  __dirname + '/default.json',
  __dirname + '/' + config.get('env') + '.json',
])
