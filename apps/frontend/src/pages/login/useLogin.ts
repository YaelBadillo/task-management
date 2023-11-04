import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useForm } from '@hooks'
import { validate } from '@utils/validate'
import { LoginSchema } from '@login/LoginSchema'
import { LOGIN_PATH } from '@login/login.const'
import { SIGNUP_PATH } from '@pages/signup'

export const useLogin = () => {
  const { form, status } = useForm({
    url: LOGIN_PATH,
    initialValues: {
      username: '',
      password: '',
    },
    withCredentials: true,
    validate: validate(LoginSchema),
    initialTouched: {
      username: false,
      password: false,
    },
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'success') navigate(SIGNUP_PATH, { replace: true })
  }, [status, navigate])

  return { form, status }
}
