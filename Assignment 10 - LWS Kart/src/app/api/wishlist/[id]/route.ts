import connectMongo from '@/db/connectMongo'
import { getCurrentUserWishlist } from '@/db/queries/user.queries'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit')

  await connectMongo()
  try {
    const wishlist = await getCurrentUserWishlist(id, Number(limit))
    return NextResponse.json(wishlist, { status: 200 })
  } catch (error) {
    throw error
  }
}
