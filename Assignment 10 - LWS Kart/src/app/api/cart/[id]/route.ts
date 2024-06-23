import connectMongo from '@/db/connectMongo'
import { getCurrentUserCart } from '@/db/queries/user.queries'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  await connectMongo()
  try {
    const cart = await getCurrentUserCart(id)
    return NextResponse.json(cart, { status: 200 })
  } catch (error) {
    throw error
  }
}
