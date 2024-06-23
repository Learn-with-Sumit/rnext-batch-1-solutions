'use client'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { MdCancel, MdEdit, MdEmail } from 'react-icons/md'
import { Button } from '../ui/button'
import { PersonalProfileEdit } from './PersonalProfileEdit'

const PersonalProfile = ({
  user,
  dictionary,
}: SessionWith_Id & {
  dictionary: IAccountPageDict['accountPage']
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const { personal_profile, no_number_added, edit, cancel } = dictionary

  const { name, email, image, phoneNumber } = user

  return (
    <div className='shadow rounded bg-white px-4 pt-6 pb-8 h-fit dark:bg-slate-700 dark:text-white'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-medium text-gray-800 text-lg dark:text-white'>
          {personal_profile}
        </h3>
        {isEditing ? (
          <Button
            onClick={() => setIsEditing(false)}
            variant='destructive'
            className='text-white flex gap-2 items-center'
          >
            <MdCancel />
            <p>{cancel}</p>
          </Button>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            variant='outline'
            className='text-primary flex gap-2 items-center'
          >
            <MdEdit />
            <p>{edit}</p>
          </Button>
        )}
      </div>
      {isEditing ? (
        <PersonalProfileEdit
          dictionary={dictionary}
          user={user}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className='space-y-1'>
          {image ? (
            <Avatar>
              <Image src={image} height={300} width={300} alt='avatar' />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <div className='bg-purple-500 rounded-full p-4 capitalize  text-white flex items-center'>
                {name[0]}
              </div>
            </Avatar>
          )}

          <h4 className='text-gray-700 dark:text-white font-medium'>{name}</h4>
          <p className='text-gray-800 dark:text-white flex items-center gap-2'>
            <MdEmail /> {email}
          </p>
          <p className='text-gray-800 dark:text-white flex items-center gap-2'>
            <Phone />{' '}
            {phoneNumber && phoneNumber.length > 0
              ? phoneNumber
              : no_number_added}
          </p>
        </div>
      )}
    </div>
  )
}
export default PersonalProfile
