import connectMongo from '@/db/connectMongo'
import { getSearchedProducts } from '@/db/queries/product.queries'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  request: NextRequest,
  { params: { query } }: { params: { query: string } }
) => {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit')
  await connectMongo()
  try {
    const products = await getSearchedProducts(query, Number(limit))
    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    throw error
  }
}
