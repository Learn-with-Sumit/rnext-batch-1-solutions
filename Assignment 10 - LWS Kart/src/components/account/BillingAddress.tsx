'use client'

import { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { MdCancel, MdEdit, MdInfo } from 'react-icons/md'
import { Button } from '../ui/button'
import { BillingForm } from './BillingForm'

const BillingAddress = ({
  user,
  dictionary,
}: {
  user: SessionWith_Id['user']
  dictionary: IAccountPageDict['accountPage']
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const { billingAddress, name, shippingAddress } = user

  // show the alert on the box and after 2500 ms, makes it normal
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (isEditing && !shippingAddress) {
      timeoutId = setTimeout(() => {
        setIsEditing(false)
      }, 2500)
    }
    return () => clearTimeout(timeoutId)
  }, [isEditing, shippingAddress])

  const {
    address,
    add_billing_address,
    phone,
    edit,
    cancel,
    post_code,
    please_add_shipping,
  } = dictionary

  // stopping the user from editing the billing address because if there is a shipping address, they can just use that as billing if they want using a checkbox
  return (
    <div
      className={`shadow rounded bg-white px-4 pt-6 pb-8 h-fit dark:text-white dark:bg-slate-700 ${
        isEditing && !shippingAddress ? 'border border-red-500' : ''
      }`}
    >
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-medium text-gray-800 text-lg dark:text-white'>
          {add_billing_address}
        </h3>
        {isEditing && shippingAddress ? (
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
      {isEditing && shippingAddress ? (
        <BillingForm
          dictionary={dictionary}
          setIsEditing={setIsEditing}
          user={user}
        />
      ) : billingAddress ? (
        <div className='space-y-1'>
          <h4 className='text-gray-700 dark:text-white font-medium flex gap-2 items-center'>
            <CgProfile />
            <p>{name}</p>
          </h4>
          <p className='text-gray-800 dark:text-white'>
            <span className='italic text-blue-500'>{address}: </span>
            {billingAddress.address}
          </p>
          <p className='text-gray-800 dark:text-white'>
            <span className='italic text-blue-500'>{post_code}: </span>
            {billingAddress.postCode}
          </p>
          <p className='text-gray-800 dark:text-white'>
            <span className='italic text-blue-500'>{phone}: </span>
            {billingAddress.phoneNumber}
          </p>
        </div>
      ) : (
        <>
          <div className='text-semibold flex gap-2 items-center italic text-blue-500'>
            <MdInfo />
            <p>{add_billing_address}</p>
          </div>
          {isEditing && !shippingAddress && (
            <div className='text-semibold flex gap-2 items-center italic text-orange-500'>
              <MdInfo />
              <p>{please_add_shipping}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default BillingAddress
