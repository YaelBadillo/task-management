import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { useReadLocalStorage } from '@hooks'

export const useVerifyLogin = <T>() => {
  const { pathname } = useLocation()

  const userProfileKey = 'userProfile'
  const immediate = false
  const [userProfile, readStorage] = useReadLocalStorage<T>(
    userProfileKey,
    immediate,
  )

  useEffect(() => {
    readStorage()
  }, [pathname, readStorage])

  return userProfile
}
