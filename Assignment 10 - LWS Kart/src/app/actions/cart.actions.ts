'use server'

import connectMongo from '@/db/connectMongo'
import { getSingleProduct } from '@/db/queries/product.queries'
import { ProductModel } from '../models/productModel'
import { UserModel } from '../models/userModel'

export const addProductToCart = async (
  userId: string,
  product: IProductWithQuantity
) => {
  await connectMongo()

  const user = await UserModel.findById(userId)

  if (!user) {
    return {
      msg: 'User not found',
    }
  } else {
    // check again if the stock for this item is available, or else, for parallel requests, it can cause wrong amount of products to be in the users cart, so need to check again on the server side first
    const requestedProduct = await getSingleProduct(product._id)
    const hasStock = requestedProduct.stock_count > 0

    if (product.quantity < 0) {
      // increase the stock count, because , any user can decrease the cart items, in that case, stock should increase
      await ProductModel.findByIdAndUpdate(
        product._id,
        { $inc: { stock_count: -product.quantity, addedAt: Date.now() } },
        { new: true }
      )
      // check if product exists in users cart already
      const isProductInCart = user.cart.some((cartProduct: IProduct) => {
        return cartProduct._id.toString() === product._id.toString()
      })

      if (isProductInCart) {
        const existingProductIndex = user.cart.findIndex(
          (cartProduct: IProductWithQuantity) => {
            return cartProduct._id.toString() === product._id.toString()
          }
        )

        if (existingProductIndex !== -1) {
          // if product exists in cart, update its quantity
          user.cart[existingProductIndex].quantity += product.quantity

          // update the addedAt too
          user.cart[existingProductIndex].addedAt = Date.now()

          await user.save()
          return user.toObject()
        }
      }
    } else {
      if (hasStock) {
        // decrease the stock count
        await ProductModel.findByIdAndUpdate(
          product._id,
          { $inc: { stock_count: -product.quantity, addedAt: Date.now() } },
          { new: true }
        )

        // check if product exists in users cart already
        const isProductInCart = user.cart.some((cartProduct: IProduct) => {
          return cartProduct._id.toString() === product._id.toString()
        })

        if (isProductInCart) {
          const existingProductIndex = user.cart.findIndex(
            (cartProduct: IProductWithQuantity) => {
              return cartProduct._id.toString() === product._id.toString()
            }
          )

          if (existingProductIndex !== -1) {
            // if product exists in cart, update its quantity
            user.cart[existingProductIndex].quantity += product.quantity

            // update the addedAt too
            user.cart[existingProductIndex].addedAt = Date.now()

            await user.save()
            return user.toObject()
          }
        } else {
          // if product does not exist in cart, add it using $push
          const update = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $push: { cart: { ...product, addedAt: Date.now() } } },
            { new: true }
          )
          return update.toObject()
        }
      } else {
        const userCart = await UserModel.findOne({
          _id: userId,
        })
        let userCartObj = userCart
        userCartObj = { ...userCartObj, status: 'no_stock' }
        return userCartObj.toObject()
      }
    }
  }
}

export const removeProductFromCart = async (
  userId: string,
  productId: string,
  restock: boolean
) => {
  await connectMongo()

  const user = await UserModel.findById(userId)

  if (!user) {
    return {
      msg: 'User not found',
    }
  } else {
    const cartProduct = user.cart.find((cartProduct: IProductWithQuantity) => {
      return cartProduct._id.toString() === productId
    })

    if (!cartProduct) {
      return {
        msg: 'Product not found in cart',
      }
    }

    if (restock) {
      await ProductModel.findByIdAndUpdate(
        productId,
        { $inc: { stock_count: cartProduct.quantity } },
        { new: true }
      )
    }

    user.cart = user.cart.filter((cartProduct: IProductWithQuantity) => {
      return cartProduct._id.toString() !== productId
    })

    await user.save()
    return user.toObject()
  }
}

export const releaseProductsFromCartAndRestoreStock = async () => {
  try {
    await connectMongo()
    const users = await UserModel.find({})

    // collect all cart items from all users
    const userCartItems = users.flatMap((user) =>
      user.cart.map((cartItem: IProductWithQuantity) => ({
        productId: cartItem._id,
        quantity: cartItem.quantity,
        expiresAt: cartItem.expiresAt,
      }))
    )

    // increase stock of the products whose cart items have expired
    const expiredItems = userCartItems.filter(
      (item) => new Date() > new Date(item.expiresAt)
    )

    // group expired items by productId
    const productQuantities = expiredItems.reduce((acc, item) => {
      acc[item.productId] = (acc[item.productId] || 0) + item.quantity
      return acc
    }, {})

    const productIds = Object.keys(productQuantities)

    // fetch the products whose stock needs to be updated
    const products = await ProductModel.find({ _id: { $in: productIds } })

    products.forEach((product) => {
      product.stock_count += productQuantities[product._id]
    })

    // save the updated product stock counts
    const savePromises = products.map((product) => product.save())
    await Promise.all(savePromises)

    // update users' carts by removing expired items
    const userUpdatePromises = users.map(async (user) => {
      user.cart = user.cart.filter(
        (cartItem: IProductWithQuantity) =>
          new Date() <= new Date(cartItem.expiresAt!)
      )
      await user.save()
    })

    await Promise.all(userUpdatePromises)

    return { message: 'Users carts updated successfully' }
  } catch (error) {
    console.error('Error updating user carts:', error)
    return { message: 'Error' }
  }
}
