import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) // when path changes, scroll to top
  }, [pathname])

  return null
}
