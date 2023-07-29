import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useForm } from '@hooks'
import { validate } from '@utils/validate'
import { LoginSchema } from '@login/LoginSchema'

export const useLogin = () => {
  const { form, status } = useForm({
    url: 'http://localhost:3000/api/auth/login',
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
    if (status === 'success') navigate('/dashboard', { replace: true })
  }, [status, navigate])

  return { form, status }
}
