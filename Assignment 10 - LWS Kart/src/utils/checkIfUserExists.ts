import axios from 'axios'

const checkIfUserExists = async (email: string) => {
  const { data: status } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${email}`
  )
  return status
}
export default checkIfUserExists
