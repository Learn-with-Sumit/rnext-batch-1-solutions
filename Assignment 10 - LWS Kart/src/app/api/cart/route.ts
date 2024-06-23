import { addProductToCart } from '@/app/actions/cart.actions'
import connectMongo from '@/db/connectMongo'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  await connectMongo()
  const { userId, product } = await request.json()
  try {
    const user = await addProductToCart(userId, product)
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    throw error
  }
}
