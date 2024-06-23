import connectMongo from '@/db/connectMongo'
import { getSingleProduct } from '@/db/queries/product.queries'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  await connectMongo()
  try {
    const reviews = await getSingleProduct(id, 'reviews')
    return NextResponse.json({ reviews }, { status: 200 })
  } catch (error) {
    throw error
  }
}
