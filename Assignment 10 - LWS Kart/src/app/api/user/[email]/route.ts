import connectMongo from '@/db/connectMongo'
import { getUserByEmail } from '@/db/queries/user.queries'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  _: NextRequest,
  { params: { email } }: { params: { email: string } }
) => {
  await connectMongo()
  try {
    const { status } = await getUserByEmail(email)
    return NextResponse.json(status, { status: 200 })
  } catch (error) {
    throw error
  }
}
