import { ProductModel } from '@/app/models/productModel'
import { UserModel } from '@/app/models/userModel'
import connectMongo from '@/db/connectMongo'
import { NextResponse } from 'next/server'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// https://console.cron-job.org/ is sending a request here every 15 minutes and managing stock and cart of users ///
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const GET = async () => {
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

    return NextResponse.json(
      { message: 'Users carts updated successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating user carts:', error)
    return NextResponse.json({ message: 'Error' }, { status: 200 })
  }
}
