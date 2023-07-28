import { FC, useContext, useEffect } from 'react'

import { Navigate } from 'react-router-dom'

import { AppContext } from '@context'
import { useReadCookie } from '@hooks'

interface PrivateRouteProps {
  redirect: string
  children: JSX.Element
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ redirect, children }) => {
  const [authenticated] = useReadCookie<boolean>('authenticated')
  const { dispatch } = useContext(AppContext)

  useEffect(() => {
    if (authenticated && dispatch)
      dispatch({
        type: '[auth] set user authenticated',
        payload: authenticated,
      })
  }, [authenticated, dispatch])

  return authenticated ? children : <Navigate to={redirect} />
}
