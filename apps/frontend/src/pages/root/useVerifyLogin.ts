import { useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { useReadLocalStorage } from '@hooks'

export const useVerifyLogin = <T>() => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const userProfileKey = 'userProfile'
  const [userProfile, readStorage] = useReadLocalStorage<T>(userProfileKey)

  useEffect(() => {
    readStorage()
  }, [pathname, readStorage])

  useEffect(() => {
    if (pathname.includes('dashboard') && userProfile === undefined) {
      navigate('/auth/login')
    }
  }, [pathname, userProfile, navigate])

  return userProfile
}
