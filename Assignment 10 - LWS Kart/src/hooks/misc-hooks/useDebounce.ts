import { useEffect, useRef } from 'react'

type Callback<T extends any[]> = (...args: T) => void

const useDebounce = <T extends any[]>(
  cb: Callback<T>,
  wait: number
): ((...args: T) => void) => {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedCallback = (...args: T) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
    timeoutIdRef.current = setTimeout(() => {
      cb(...args)
    }, wait)
  }

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [])

  return debouncedCallback
}

export default useDebounce
