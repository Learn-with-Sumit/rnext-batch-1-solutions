import connectMongo from '@/db/connectMongo'
import { getWishlistCount } from '@/db/queries/user.queries'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  await connectMongo()
  try {
    const wishlist = await getWishlistCount(id)
    return NextResponse.json(wishlist, { status: 200 })
  } catch (error) {
    throw error
  }
}
