import { useContext } from 'react'
import { AuthContext } from '../context/index.js'

const useAuth = () => {
  return useContext(AuthContext)
}
export default useAuth
