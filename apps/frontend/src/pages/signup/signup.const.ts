import { Type } from '@components/auth-form'

export const SIGNUP_URL = 'http://localhost:3000/api/auth/sign-up'

export const SIGNUP_PATH = '/auth/signup'

interface Input {
  type: Type
  placeholder: string
  name: string
}

export const SignupUsernameInput: Input = {
  type: 'text',
  placeholder: 'Username',
  name: 'username',
}

export const SignupPasswordInput: Input = {
  type: 'password',
  placeholder: 'Password',
  name: 'password',
}

export const SignupConfirmPasswordInput: Input = {
  type: 'password',
  placeholder: 'Confirm password',
  name: 'confirmPassword',
}

export const SignupAuthSwitch = {
  linkText: 'Login',
  linkPath: '/auth/login',
}
