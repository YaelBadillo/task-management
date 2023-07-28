import { useContext, useEffect } from 'react'

import { UserDto } from 'shared'

import { useFetch } from '@hooks'
import { AppContext } from '@context'

export const Dashboard = () => {
  const { dispatch } = useContext(AppContext)
  const { execute, status, value } = useFetch<UserDto>({
    url: 'http://localhost:3000/api/user-profile',
    method: 'get',
    withCredentials: true,
  })

  useEffect(() => {
    execute()
  }, [execute])

  useEffect(() => {
    if (status === 'success' && dispatch)
      dispatch({ type: '[dashboard] set user profile', payload: value })
  }, [status, dispatch, value])

  return <div>Dashboard</div>
}

export default Dashboard
