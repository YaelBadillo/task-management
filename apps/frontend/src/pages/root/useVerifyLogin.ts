import { useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { useReadCookie } from '@pages/root/useReadCookie'

export const useVerifyLogin = () => {
  const [authenticated, reload] = useReadCookie<boolean>('authenticated')
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    reload()
  }, [pathname, reload])

  useEffect(() => {
    if (pathname.includes('dashboard') && authenticated !== true)
      navigate('/auth/login')
  }, [authenticated, navigate, pathname])

  return authenticated
}
