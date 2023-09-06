export const ENV = 'env'

export const Envs = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  TEST: 'test',
} as const

export type EnvKeys = (typeof Envs)[keyof typeof Envs]

export const PORT = 'port'
