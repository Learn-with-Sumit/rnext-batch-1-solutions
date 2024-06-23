import {
  doSignInWithFB,
  doSignInWithGit,
  doSignInWithGoogle,
} from '@/app/actions/auth.actions'

const SignIn = ({ medium }: { medium: string }) => {
  if (medium === 'google') {
    return (
      <form action={doSignInWithGoogle} className='w-full flex justify-center'>
        <button
          className='py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500 w-1/2'
          type='submit'
        >
          Google
        </button>
      </form>
    )
  } else if (medium === 'github') {
    return (
      <form action={doSignInWithGit} className='w-full flex justify-center'>
        <button
          className='py-2 text-center text-white bg-cyan-800 rounded uppercase font-roboto font-medium text-sm hover:bg-cyan-500 w-1/2'
          type='submit'
        >
          Github
        </button>
      </form>
    )
  } else {
    return (
      <form action={doSignInWithFB} className='w-full flex justify-center'>
        <button
          className='w-fit px-2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700'
          type='submit'
        >
          Facebook
        </button>
      </form>
    )
  }
}

export default SignIn
