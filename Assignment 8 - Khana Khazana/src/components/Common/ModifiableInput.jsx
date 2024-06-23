import useInputTypeConverter, {
  PASSWORD,
} from '@/hooks/useInputTypeConverter.js'
import { IoEye, IoEyeOff } from 'react-icons/io5'

const ModifiableInput = ({ className }) => {
  const { inputType, makeInputTypePassword, makeInputTypeText } =
    useInputTypeConverter()

  return (
    <>
      <input
        type={inputType}
        name='password'
        className={className}
        id='password'
      />
      {inputType === PASSWORD ? (
        <IoEyeOff
          onClick={makeInputTypeText}
          className='absolute right-2 top-2 cursor-pointer size-6'
        />
      ) : (
        <IoEye
          onClick={makeInputTypePassword}
          className='absolute right-2 top-2 cursor-pointer size-6'
        />
      )}
    </>
  )
}
export default ModifiableInput
