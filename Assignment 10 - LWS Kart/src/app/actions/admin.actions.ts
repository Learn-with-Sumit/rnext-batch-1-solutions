'use server'

import connectMongo from '@/db/connectMongo'
import { ProductModel } from '../models/productModel'
import { UserModel } from '../models/userModel'

export const deleteProductById = async (id: string) => {
  try {
    await connectMongo()
    const product = await ProductModel.findById(id)

    if (!product) {
      return { msg: 'Not found!' }
    } else {
      await ProductModel.deleteOne({ _id: id })
      // remove the item from cart of users
      await UserModel.updateMany(
        { 'cart._id': id },
        { $pull: { cart: { _id: id } } }
      )

      return { msg: 'Deleted Product' }
    }
  } catch (error) {
    throw error
  }
}

export const createNewProduct = async (data: IProduct) => {
  try {
    await connectMongo()

    // get 5 random images from the collection where the category matches, basically doing some black magic ✨ for now,
    // (Would prefer letting the user upload 5 other images like bikroy or some site)
    const randomProductImagesBasedOnCategory = await ProductModel.aggregate([
      { $match: { category: data.category } },
      { $unwind: '$otherImages' },
      { $sample: { size: 5 } },
      { $group: { _id: null, images: { $push: '$otherImages' } } },
      { $project: { _id: 0, images: 1 } },
    ])

    const randomImages =
      randomProductImagesBasedOnCategory.length > 0
        ? randomProductImagesBasedOnCategory[0].images
        : []

    const product = await ProductModel.create({
      ...data,
      otherImages: randomImages,
    })

    return product.toObject()
  } catch (error) {
    throw error
  }
}

export const deleteReviewFromProduct = async (
  reviewId: string,
  productId: string
) => {
  try {
    await connectMongo()

    const product = await ProductModel.findById(productId)

    if (!product) {
      return { msg: 'No product found' }
    }

    const matchedReviewIndex = product.reviews.findIndex(
      (review: IReviews['reviews'][0]) => review._id?.toString() === reviewId
    )

    // delete the review and save the new product
    if (matchedReviewIndex !== -1) {
      product.reviews.splice(matchedReviewIndex, 1)
      await product.save()
    } else {
      return { msg: 'No review by that id' }
    }

    return { msg: 'Successfully deleted review' }
  } catch (error) {
    throw error
  }
}
const allowedFields = ['product_name', 'stock_count', 'category']

export const manageProduct = async (
  id: string,
  field: 'product_name' | 'stock_count' | 'category',
  update: string | number
) => {
  try {
    await connectMongo()
    const product = await ProductModel.findByIdAndUpdate(
      id,
      {
        [field]: update,
      },
      { new: true }
    )

    if (!product) {
      return { msg: 'No product found' }
    }

    return {
      update,
    }
  } catch (error) {
    throw error
  }
}
