'use client'

import { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { MdCancel, MdEdit, MdInfo } from 'react-icons/md'
import { Button } from '../ui/button'
import { ShippingForm } from './ShippingForm'

const ShippingAddress = ({
  user,
  dictionary,
}: {
  user: SessionWith_Id['user']
  dictionary: IAccountPageDict['accountPage']
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const { shippingAddress, name } = user

  const {
    address,
    post_code,
    add_shipping_address,
    shipping_address,
    phone,
    cancel,
    edit,
  } = dictionary

  return (
    <div className='shadow rounded bg-white px-4 pt-6 pb-8 h-fit dark:text-white dark:bg-slate-700'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-medium text-gray-800 text-lg dark:text-white'>
          {shipping_address}
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
        <ShippingForm
          dictionary={dictionary}
          setIsEditing={setIsEditing}
          user={user}
        />
      ) : shippingAddress ? (
        <div className='space-y-1'>
          <h4 className='text-gray-700 font-medium flex gap-2 items-center dark:text-white'>
            <CgProfile />
            <p>{name}</p>
          </h4>
          <p className='text-gray-800 dark:text-white'>
            <span className='italic text-blue-500'>{address}: </span>
            {shippingAddress.address}
          </p>
          <p className='text-gray-800 dark:text-white'>
            <span className='italic text-blue-500'>{post_code}: </span>
            {shippingAddress.postCode}
          </p>
          <p className='text-gray-800 dark:text-white'>
            <span className='italic text-blue-500'>{phone}: </span>
            {shippingAddress.phoneNumber}
          </p>
        </div>
      ) : (
        <div className='text-semibold flex gap-2 items-center italic text-blue-500'>
          <MdInfo />
          <p>{add_shipping_address}</p>
        </div>
      )}
    </div>
  )
}

export default ShippingAddress
