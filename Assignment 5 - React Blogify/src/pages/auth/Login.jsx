import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormRow from '../../components/auth/FormRow.jsx'
import { EMAIL_REGEX } from '../../constants.js'
import useLoginUser from '../../hooks/api/useLoginUser.js'
import useAuth from '../../hooks/useAuth.js'
import AlreadyLoggedIn from './AlreadyLoggedIn.jsx'

const Login = () => {
  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm()
  const { auth, setAuth } = useAuth()

  const isLoggedIn = auth?.token?.accessToken

  const { mutate, isLoading } = useLoginUser()

  const onSubmit = (data) => {
    mutate(data, {
      // set the hook form error on error
      onError: (error) => {
        setError('root.serverError', {
          type: 'random',
          message: error?.response?.data?.error,
        })
      },
      // show toast on success
      onSuccess: (data) => {
        setAuth(data.data)
        sessionStorage.setItem('userdet', JSON.stringify(data.data))
        toast.success(`Welcome ${data.data.user.firstName}`, {
          autoClose: 1000,
        })
        navigate('/')
      },
    })
  }
  return isLoggedIn ? (
    <AlreadyLoggedIn />
  ) : (
    <section className='container flex flex-col'>
      <div className='w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12'>
        <h2 className='text-2xl font-bold mb-6'>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
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
              {isLoading ? 'Logging In' : 'Log In'}
            </button>
          </div>
          {/* show error coming from the server after submit */}
          <p className='text-red-500'>
            {errors?.root?.serverError?.type === 'random' &&
              errors?.root?.serverError?.message}
          </p>
          <p className='text-center'>
            Don&apos;t have an account?{' '}
            <Link to='/register' className='text-indigo-600 hover:underline'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}
export default Login
