import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth()
  const [authChecked, setAuthChecked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storedAuthStatus = sessionStorage.getItem('userdet')
    if (storedAuthStatus) {
      setIsLoggedIn(JSON.parse(storedAuthStatus))
      setAuthChecked(true)
    } else if (!authChecked && auth !== null) {
      setIsLoggedIn(!!auth?.token?.accessToken)
      setAuthChecked(true)
    }
  }, [auth, authChecked])

  if (!authChecked) {
    return <p>Not logged in </p> // Show loading indicator until authentication status is determined
  }

  if (isLoggedIn) {
    return children
  } else {
    return <Navigate to='/login' />
  }
}
export default PrivateRoute
