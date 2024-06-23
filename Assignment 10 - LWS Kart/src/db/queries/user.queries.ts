import { OrdersModel } from '@/app/models/ordersModel'
import { UserModel } from '@/app/models/userModel'
import mongoose from 'mongoose'
import connectMongo from '../connectMongo'

export const getCurrentUserWishlist = async (userId: string, limit = 10) => {
  try {
    await connectMongo()
    const { wishlist } = await UserModel.findById(userId).select({
      wishlist: { $slice: limit },
    })
    if (!wishlist) {
      return { msg: 'No user found' }
    }
    return wishlist
  } catch (error) {
    throw error
  }
}

export const getCurrentUserCart = async (userId: string) => {
  try {
    await connectMongo()
    const user = await UserModel.findById(userId)
    if (!user) {
      return { msg: 'No user found' }
    }
    return user.cart
  } catch (error) {
    throw error
  }
}

export const getUserOrders = async (
  userId: string,
  limit: number = 10,
  skip: number
) => {
  try {
    await connectMongo()
    const orders = await OrdersModel.find({ userId })
      .lean()
      .limit(limit)
      .skip(skip)
    return orders
  } catch (error) {
    throw error
  }
}
export async function getUserByEmail(email: string) {
  try {
    await connectMongo()

    const user = await UserModel.findOne({ email }).lean()

    if (!user) {
      return {
        status: false,
      }
    } else {
      return {
        status: true,
      }
    }
  } catch (error) {
    throw error
  }
}

export const getWishlistCount = async (userId: string) => {
  try {
    await connectMongo()

    const result = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $project: { wishlistCount: { $size: '$wishlist' } } },
    ])

    if (result.length > 0) {
      return result[0].wishlistCount
    } else {
      return 0
    }
  } catch (error) {
    throw error
  }
}
