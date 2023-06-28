import { useCallback, useEffect, useState } from 'react'

export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true,
) => {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle')
  const [value, setValue] = useState<T | undefined>(undefined)
  const [error, setError] = useState<E | undefined>(undefined)

  const execute = useCallback(() => {
    setStatus('pending')
    setValue(undefined)
    setError(undefined)
    return asyncFunction()
      .then((response: T) => {
        setValue(response)
        setStatus('success')
      })
      .catch((error: E) => {
        setError(error)
        setStatus('error')
      })
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, status, value, error }
}
