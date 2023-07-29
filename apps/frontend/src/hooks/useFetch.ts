import { useCallback } from 'react'

import { HttpException } from 'shared'

import { fetchData } from '@utils/fetch-data'
import { useAsync } from '@hooks'

interface UseFetchConfig<D> {
  url: string
  method: Method
  body?: D
  withCredentials?: boolean
}

type Method = 'get' | 'post' | 'patch' | 'delete'

export const useFetch = <T, D = undefined>({
  url,
  method,
  body,
  withCredentials,
}: UseFetchConfig<D>) => {
  const immediate = false
  const fetchDataCallback = useCallback(
    () => fetchData<T, D>(url, method, body, withCredentials),
    [url, method, body, withCredentials],
  )

  return useAsync<T, Error | HttpException>(fetchDataCallback, immediate)
}
