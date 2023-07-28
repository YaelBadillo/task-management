import { FC } from 'react'

import { Navigate } from 'react-router-dom'

import { useReadCookie } from '@hooks'

interface PublicRouteProps {
  redirect: string
  children: JSX.Element
}

export const PublicRoute: FC<PublicRouteProps> = ({ redirect, children }) => {
  const [authenticated] = useReadCookie<boolean>('authenticated')

  return authenticated ? <Navigate to={redirect} /> : children
}
