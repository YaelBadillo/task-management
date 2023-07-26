import { useCallback, useState } from 'react'

export const useReadLocalStorage = <T>(
  key: string,
): [T | undefined, () => void] => {
  const getValue = useCallback((): T | undefined => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : undefined
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return undefined
    }
  }, [key])

  const [storedValue, setValue] = useState<T | undefined>(getValue)

  const readStoredValue = useCallback(() => {
    const value = getValue()
    if (value) setValue(value)
  }, [getValue])

  return [storedValue, readStoredValue]
}
