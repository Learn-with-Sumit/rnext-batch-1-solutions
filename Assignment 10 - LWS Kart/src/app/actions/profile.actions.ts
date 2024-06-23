'use server'
import { UserModel } from '@/app/models/userModel'
import generateAuthToken from '@/utils/generateAuthToken'
import bcrypt from 'bcryptjs'
import connectMongo from '../../db/connectMongo'
import { AuthTokenModel } from '../models/TokenModel'

export const updateProfileAddress = async (
  userId: string,
  details: {
    postCode: number
    address: string
    phoneNumber: number
    flag: string
  }
) => {
  await connectMongo()
  const { postCode, address, phoneNumber, flag } = details
  const user = await UserModel.findById(userId)

  if (!user) {
    return {
      msg: 'User not found',
    }
  }

  let toUpdate = {}

  // check which address to update
  if (flag === 'shipping') {
    toUpdate = {
      shippingAddress: {
        postCode,
        address,
        phoneNumber,
      },
    }
  } else {
    toUpdate = {
      billingAddress: {
        postCode,
        address,
        phoneNumber,
      },
    }
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, toUpdate, {
      new: true,
    })
    return {
      msg: 'Profile updated successfully',
      user: updatedUser,
    }
  } catch (error) {
    return {
      msg: 'Error updating profile',
      status: 'error',
    }
  }
}
export const updatePersonalProfile = async (
  userId: string,
  details: {
    name?: string
    email?: string
    image?: string
    oldPassword?: string
    password?: string
    phoneNumber?: string
  }
) => {
  await connectMongo()

  const user = await UserModel.findById(userId)

  if (!user) {
    return {
      msg: 'User not found',
      status: 'error',
    }
  }

  let toUpdate: typeof details = {}

  // populate details object based on the provided details
  if (details?.name) toUpdate.name = details?.name
  if (details?.email) toUpdate.email = details?.email
  if (details?.image) toUpdate.image = details?.image
  toUpdate.phoneNumber = details?.phoneNumber

  // check if old and new password match
  if (details?.oldPassword && details?.password) {
    const isMatch = await bcrypt.compare(details?.oldPassword, user.password)
    if (!isMatch) {
      return {
        msg: 'Old password is incorrect',
        status: 'error',
      }
    }
    toUpdate.password = await bcrypt.hash(details?.password, 5)
  }

  if (Object.keys(toUpdate).length === 0) {
    return {
      msg: 'No fields to update',
      status: 'error',
    }
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, toUpdate, {
      new: true,
    })
    //  if user edits the email, we must delete the old token and create a new token with new email
    if (details?.email) {
      await generateAuthToken(updatedUser?.email, 'false')
    }

    return JSON.stringify({
      msg: 'Profile updated successfully',
      user: updatedUser,
      status: 'success',
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    return {
      msg: 'Error updating profile',
      status: 'error',
    }
  }
}
