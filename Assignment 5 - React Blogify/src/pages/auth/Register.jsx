import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormRow from '../../components/auth/FormRow.jsx'
import { EMAIL_REGEX } from '../../constants.js'
import useRegisterUser from '../../hooks/api/useRegisterUser.js'
import { generateFullName } from '../../utils/generateFullName.js'

const Register = () => {
  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm()

  const { mutate, isLoading } = useRegisterUser()

  const onSubmit = (data) => {
    mutate(data, {
      onError: (error) => {
        setError('root.serverError', {
          type: 'random',
          message: error?.response?.data?.error,
        })
      },
      onSuccess: (data) => {
        toast.success(
          `Account opened as ${generateFullName(
            data.data.user.firstName,
            data.data.user.lastName
          )}. Login now.`
        )
        navigate('/login')
      },
    })
  }

  return (
    <section className='container'>
      <div className='w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12'>
        <h2 className='text-2xl font-bold mb-6'>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <FormRow label='First Name' error={errors.firstName}>
            <input
              className='w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500'
              {...register('firstName', {
                required: 'First Name is Required',
              })}
              type='firstName'
              name='firstName'
              id='firstName'
            />
          </FormRow>
          <FormRow label='Last Name' error={errors.lastName}>
            <input
              className='w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500'
              {...register('lastName', {
                required: 'Last Name is Required',
              })}
              type='lastName'
              name='lastName'
              id='lastName'
            />
          </FormRow>
          <FormRow label='Email' error={errors.email}>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Invalid Email',
                },
              })}
              className='w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500'
              type='email'
              name='email'
              id='email'
            />
          </FormRow>

          <FormRow label='Password' error={errors.password}>
            <input
              className='w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              type='password'
              name='password'
              id='password'
            />
          </FormRow>
          <div className='mb-6'>
            <button
              disabled={isLoading}
              type='submit'
              className={`w-full  ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white p-3 rounded-md  transition-all duration-200`}
            >
              {isLoading ? 'Creating' : 'Create Account'}
            </button>
          </div>
          <p className='text-red-500'>
            {errors?.root?.serverError?.type === 'random' &&
              errors?.root?.serverError?.message}
          </p>
          <p className='text-center'>
            Already have account?{' '}
            <Link to='/login' className='text-indigo-600 hover:underline'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}
export default Register
