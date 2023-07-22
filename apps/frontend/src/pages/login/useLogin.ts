import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useForm } from '@hooks'
import { useUserProfile } from '@pages/login/useUserProfile'

export const useLogin = () => {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle')
  const { formik, status: loginStatus } = useForm({
    url: 'http://localhost:3000/api/auth/login',
    initialValues: {
      username: '',
      password: '',
    },
    withCredentials: true,
  })
  const { getUserProfile, userProfileStatus } = useUserProfile()

  const navigate = useNavigate()

  useEffect(() => {
    if (loginStatus === 'pending') setStatus('pending')
  }, [loginStatus])

  useEffect(() => {
    if (loginStatus === 'success') getUserProfile()
  }, [loginStatus, getUserProfile])

  useEffect(() => {
    if (userProfileStatus === 'success') {
      navigate('/dashboard')
    }
  }, [navigate, userProfileStatus])

  return { formik, status }
}
