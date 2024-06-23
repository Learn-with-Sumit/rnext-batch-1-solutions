import { useEffect } from 'react'
import CloseIcon from '../../assets/icons/close.svg'
import EditIcon from '../../assets/icons/edit.svg'
import useUpdateProfile from '../../hooks/api/useUpdateProfile.js'
import { generateFullName } from '../../utils/generateFullName.js'
import FormRow from '../auth/FormRow.jsx'
import Avatar from '../common/Avatar.jsx'
import ActionButton from './ActionButton.jsx'

const ProfileInfo = ({ profile = {} }) => {
  const { avatar, bio, email, firstName, lastName, id: profileId } = profile

  const {
    fileInputRef,
    onSubmit,
    handleOpenFileUpload,
    currentlyEditing,
    setCurrentlyEditing,
    errors,
    handleSubmit,
    register,
    isLoggedInAndUserIsMe,
    reset,
    watch,
  } = useUpdateProfile(profile, profileId)

  // if user presses the escape button,the form input will close
  useEffect(() => {
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setCurrentlyEditing(null)
      }
    })
  }, [setCurrentlyEditing])

  return (
    <div className='flex flex-col items-center py-8 text-center'>
      {/* profile image */}
      <div className='relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]'>
        <div
          className={`w-full h-full${
            avatar ? '' : 'bg-orange-600'
          } text-white grid place-items-center text-5xl rounded-full`}
        >
          <Avatar avatar={avatar} firstName={firstName} />
        </div>
        <input
          accept='image/png, image/gif, image/jpeg'
          ref={fileInputRef}
          hidden
          type='file'
          name='avatar'
        />
        {isLoggedInAndUserIsMe && (
          <button
            onClick={handleOpenFileUpload}
            className='grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80'
          >
            <img src={EditIcon} alt='Edit' />
          </button>
        )}
      </div>
      {/* name , email */}
      <div className='relative'>
        {currentlyEditing === 'name' ? (
          <div className='flex flex-col gap-2'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormRow label='First Name' error={errors.firstName}>
                <input
                  autoFocus
                  className='w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500'
                  {...register('firstName', {
                    required: 'First Name is required',
                  })}
                  type='text'
                  name='firstName'
                  id='firstName'
                />
              </FormRow>
              <FormRow label='Last Name' error={errors.lastName}>
                <input
                  className='w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500'
                  {...register('lastName', {
                    required: 'Last Name is required',
                  })}
                  type='text'
                  name='lastName'
                  id='lastName'
                />
              </FormRow>
              <input
                type='submit'
                value='Save Changes'
                className='bg-white rounded-md p-2 text-black cursor-pointer'
              />
            </form>
          </div>
        ) : (
          <h3 className='text-2xl font-semibold text-white lg:text-[28px]'>
            {generateFullName(firstName, lastName)}
          </h3>
        )}

        {isLoggedInAndUserIsMe && (
          <div>
            {currentlyEditing === 'name' ? (
              <ActionButton
                className='bottom-14'
                cb={() => setCurrentlyEditing('')}
              >
                <img src={CloseIcon} alt='Edit' />
              </ActionButton>
            ) : (
              <ActionButton
                className='bottom-7'
                cb={() => {
                  setCurrentlyEditing('name')
                  reset()
                }}
              >
                <img src={EditIcon} alt='Edit' />
              </ActionButton>
            )}
          </div>
        )}

        <p className='leading-[231%] lg:text-lg'>{email}</p>
      </div>
      {/* bio */}
      <div className='mt-4 flex items-start gap-2 lg:mt-6'>
        {currentlyEditing === 'bio' ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mb-6 flex flex-col gap-2 ml-10'
          >
            <FormRow label='Bio'>
              <textarea
                autoFocus
                {...register('bio')}
                className='bg-gray-800 rounded-md p-4 w-96'
                id='bio'
                name='bio'
                placeholder='Write your bio'
                rows='8'
              ></textarea>
            </FormRow>
            {/* if user wrote anything then show button */}
            {watch('bio') && (
              <input
                type='submit'
                value='Save Changes'
                className='bg-white rounded-md p-2 text-black cursor-pointer'
              />
            )}
          </form>
        ) : (
          <div className='flex-1'>
            {bio ? (
              <p className='leading-[188%] text-gray-400 lg:text-lg'>{bio}</p>
            ) : (
              <p className='leading-[188%] text-gray-400 lg:text-lg'>
                Add a bio...
              </p>
            )}
          </div>
        )}

        {isLoggedInAndUserIsMe && (
          <div className='relative'>
            {currentlyEditing === 'bio' ? (
              <ActionButton cb={() => setCurrentlyEditing(null)}>
                <img src={CloseIcon} alt='Edit' />
              </ActionButton>
            ) : (
              <button
                onClick={() => setCurrentlyEditing('bio')}
                className='flex-center h-7 w-7 rounded-full'
              >
                <img src={EditIcon} alt='Edit' />
              </button>
            )}
          </div>
        )}
      </div>
      <div className='w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8' />
    </div>
  )
}
export default ProfileInfo
