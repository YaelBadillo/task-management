import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useForm } from '@hooks'

export const useLogin = () => {
  const { formik, status } = useForm({
    url: 'http://localhost:3000/api/auth/login',
    initialValues: {
      username: '',
      password: '',
    },
    withCredentials: true,
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'success') navigate('/dashboard', { replace: true })
  }, [status, navigate])

  return { formik, status }
}
