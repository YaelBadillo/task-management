import convict from 'convict'

export const config = convict({
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
})

config.loadFile([
  __dirname + '/default.json',
  __dirname + '/' + config.get('env') + '.json',
])
