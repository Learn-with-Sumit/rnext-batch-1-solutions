import { AuthContext } from '@/context/index.js'
import { useContext } from 'react'

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext) ?? {}

  return { user, setUser }
}
