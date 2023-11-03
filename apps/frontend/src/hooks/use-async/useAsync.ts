import { useCallback, useEffect, useState } from 'react'

import { AsyncStatus, AsyncStatusKeys } from '@hooks'

export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true,
) => {
  const [status, setStatus] = useState<AsyncStatusKeys>(AsyncStatus.IDLE)
  const [value, setValue] = useState<T | undefined>(undefined)
  const [error, setError] = useState<E | undefined>(undefined)

  const execute = useCallback(() => {
    setStatus(AsyncStatus.PENDING)
    setValue(undefined)
    setError(undefined)
    return asyncFunction()
      .then((response: T) => {
        setValue(response)
        setStatus(AsyncStatus.SUCCESS)
      })
      .catch((error: E) => {
        setError(error)
        setStatus(AsyncStatus.ERROR)
      })
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, status, value, error }
}
