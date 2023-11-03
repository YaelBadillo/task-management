import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { AsyncStatus, useForm } from '@hooks'
import { validate } from '@utils/validate'
import { SignupSchema } from '@signup/SignupSchema'
import { SIGNUP_URL } from '@signup/signup.const'
import { LOGIN_PATH } from '@pages/login'

export const useSignup = () => {
  const { form, status } = useForm({
    url: SIGNUP_URL,
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validate(SignupSchema),
    initialTouched: {
      username: false,
      password: false,
      passwordConfirm: false,
    },
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (status === AsyncStatus.SUCCESS) navigate(LOGIN_PATH)
  }, [status, navigate])

  return { form, status }
}
