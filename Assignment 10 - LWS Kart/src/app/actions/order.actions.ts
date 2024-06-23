'use server'

import connectMongo from '@/db/connectMongo'
import { OrdersModel } from '../models/ordersModel'
import { ProductModel } from '../models/productModel'
import { UserModel } from '../models/userModel'
import { sendEmail } from './email.actions'

export const createOrder = async (
  userId: string,
  userDetails: any,
  items: IProductWithQuantity[],
  cost: number
) => {
  await connectMongo()
  const user = await UserModel.findById(userId)

  if (!user) {
    return {
      msg: 'User not found',
    }
  }
  try {
    const order = await OrdersModel.create({
      userId,
      userDetails,
      items,
      cost,
    })
    // send email after creating the order
    await sendEmail(userDetails, items, cost)
    return order.toObject()
  } catch (error) {
    return {
      msg: 'Error creating order' + error,
      status: 'error',
    }
  }
}

export const reviewOrderedItem = async (
  userId: string,
  productId: string,
  rating: number,
  review: string,
  badReviewReason?: string
) => {
  await connectMongo()

  try {
    const product = await ProductModel.findOne({
      _id: productId,
      'reviews.userId': userId,
    })

    const user = await UserModel.findById(userId)
    if (!user) {
      return {
        msg: 'User not found',
      }
    }
    // edit the existing if it exists
    if (product) {
      await ProductModel.updateOne(
        { _id: productId, 'reviews.userId': userId },
        {
          $set: {
            'reviews.$.rating': rating,
            'reviews.$.review': review,
            'reviews.$.badReasonReview': badReviewReason,
          },
        }
      )
      // if does not exist, just add it
    } else {
      await ProductModel.findOneAndUpdate(
        { _id: productId },
        {
          $push: {
            reviews: {
              userId,
              username: user.name,
              review,
              productId,
              rating,
              badReasonReview: badReviewReason,
            },
          },
        }
      )
    }

    return { status: 'success' }
  } catch (error) {
    console.error('Error adding or updating review:', error)
    return {
      msg: 'Error adding or updating review',
      status: 'error',
    }
  }
}
