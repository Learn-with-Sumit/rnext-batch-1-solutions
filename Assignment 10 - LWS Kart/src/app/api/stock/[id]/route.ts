import connectMongo from '@/db/connectMongo'
import { getSingleProduct } from '@/db/queries/product.queries'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  await connectMongo()
  try {
    const product = await getSingleProduct(id)
    return NextResponse.json({ stock: product.stock_count }, { status: 200 })
  } catch (error) {
    throw error
  }
}
