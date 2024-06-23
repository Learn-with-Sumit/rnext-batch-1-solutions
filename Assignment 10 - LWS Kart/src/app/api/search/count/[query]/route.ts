import connectMongo from '@/db/connectMongo'
import { getTotalProductCount } from '@/db/queries/product.queries'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  _: NextRequest,
  { params: { query } }: { params: { query: string } }
) => {
  await connectMongo()
  try {
    const products = await getTotalProductCount(query)
    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    throw error
  }
}
