import { UserModel } from '@/app/models/userModel'
import connectMongo from '@/db/connectMongo'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  await connectMongo()
  const { name, email, password, accountType } = await request.json()

  if (!name || !password || !email) {
    return new NextResponse('Authentication info is missing.', {
      status: 400,
    })
  }

  const hashedPassword = await bcrypt.hash(password, 5)

  const newUser = {
    name,
    email,
    password: hashedPassword,
    accountType,
  }
  try {
    const isUserAlreadyInDB = await UserModel.findOne({ email })

    // show a message if user is already registered
    if (isUserAlreadyInDB) {
      return new NextResponse(
        `An account with email -> ${email} already exists`,
        {
          status: 200,
        }
      )
    } else {
      await UserModel.create(newUser)
      return new NextResponse(`User ${name} has been created`, {
        status: 201,
      })
    }
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}
