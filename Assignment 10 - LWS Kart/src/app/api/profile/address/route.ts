import { updateProfileAddress } from '@/app/actions/profile.actions'
import connectMongo from '@/db/connectMongo'
import { NextRequest, NextResponse } from 'next/server'

export const PATCH = async (request: NextRequest) => {
  await connectMongo()
  const { userId, update } = await request.json()
  try {
    const user = await updateProfileAddress(userId, update)
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    throw error
  }
}
