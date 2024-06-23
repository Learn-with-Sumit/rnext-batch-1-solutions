import {
  CREATE_ACCOUNT,
  CREATING_ACCOUNT,
  LOGGING_IN,
  LOGIN,
} from '@/util/constants.js'
import { useFormStatus } from 'react-dom'

const Submit = ({ children }) => {
  const { pending } = useFormStatus()

  // if children is login button and the state is pending then show 'logging in',
  // else if children is create account button and state pending, show 'creating account'

  const submitContent =
    children === LOGIN && pending
      ? LOGGING_IN
      : children === CREATE_ACCOUNT && pending
      ? CREATING_ACCOUNT
      : children

  return (
    <button
      disabled={pending}
      type='submit'
      className={` py-3 rounded-md text-white w-full mt-4 ${
        pending ? 'bg-gray-300' : 'bg-[#eb4a36]'
      }`}
    >
      {submitContent}
    </button>
  )
}
export default Submit
