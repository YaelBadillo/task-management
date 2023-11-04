import { Type } from '@components/auth-form'

export const LOGIN_PATH = '/auth/login'

export const LOGIN_URL = 'http://localhost:3000/api/auth/login'

interface Input {
  type: Type
  placeholder: string
  name: string
}

export const LoginUsernameInput: Input = {
  type: 'text',
  placeholder: 'Username',
  name: 'username',
}

export const LoginPasswordInput: Input = {
  type: 'password',
  placeholder: 'Password',
  name: 'password',
}

export const LoginAuthSwitch = {
  linkText: 'Sign up',
  linkPath: '/auth/signup',
}
