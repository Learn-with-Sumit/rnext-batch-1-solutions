import { useEffect, useState } from 'react'

const useStickyHeader = () => {
  const [header, setHeader] = useState(false)

  const scrollHeader = () => {
    if (window.scrollY >= 500) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHeader)

    return () => window.removeEventListener('scroll', scrollHeader)
  }, [])

  return header
}
export default useStickyHeader
