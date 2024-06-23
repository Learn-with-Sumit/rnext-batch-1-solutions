import { useState } from 'react'

export const PASSWORD = 'password'
export const TEXT = 'text'

const useInputTypeConverter = () => {
  const [inputType, setInputType] = useState(PASSWORD)
  const makeInputTypeText = () => setInputType(TEXT)
  const makeInputTypePassword = () => setInputType(PASSWORD)

  return { inputType, makeInputTypePassword, makeInputTypeText }
}
export default useInputTypeConverter
