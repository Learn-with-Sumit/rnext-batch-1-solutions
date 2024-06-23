import { useEffect, useRef } from 'react'

const useDebounce = (cb, wait) => {
  const timeoutIdRef = useRef(null)

  const debouncedCallback = (...args) => {
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
