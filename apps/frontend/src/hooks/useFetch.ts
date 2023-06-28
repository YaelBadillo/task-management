import { fetchData } from '@utils/fetch-data'
import { useAsync } from '@hooks'

type Method = 'get' | 'post' | 'patch' | 'delete'

export const useFetch = <T, D = object>(
  url: string,
  method: Method,
  body: D,
  withCredentials = false,
) => {
  const immediate = false
  return useAsync<T, Error>(
    () => fetchData<T, D>(url, method, body, withCredentials),
    immediate,
  )
}
