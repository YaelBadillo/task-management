import { useEffect, useState } from 'react'

import { UserDto } from 'shared'

import { useFetch, useLocalStorage } from '@hooks'

export const useUserProfile = () => {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle')
  const {
    execute: getUserProfile,
    status: userProfileStatus,
    value: userProfileValue,
  } = useFetch<UserDto>(
    'http://localhost:3000/api/user-profile',
    'get',
    {},
    true,
  )
  const [storedValue, setValue] = useLocalStorage<UserDto>('userProfile')

  useEffect(() => {
    if (userProfileStatus === 'pending') setStatus('pending')
  }, [userProfileStatus])

  useEffect(() => {
    if (userProfileStatus === 'success') setValue(userProfileValue)
  }, [setValue, userProfileStatus, userProfileValue])

  useEffect(() => {
    if (storedValue !== undefined) setStatus('success')
  }, [storedValue])

  return { getUserProfile, userProfileStatus: status }
}
