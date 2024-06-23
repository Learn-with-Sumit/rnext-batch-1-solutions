import { PasswordResetTokenModel } from '@/app/models/passwordResetTokenModel'
import { AuthTokenModel } from '@/app/models/TokenModel'
import connectMongo from '../connectMongo'

export const getPasswordResetTokenByToken = async (token: string) => {
  await connectMongo()

  try {
    const passwordToken = await PasswordResetTokenModel.findOne({ token })

    return passwordToken
  } catch (error) {
    return null
  }
}

export const getPasswordResetTokenByEmail = async (email: string) => {
  await connectMongo()

  try {
    const passwordToken = await PasswordResetTokenModel.findOne({ email })

    return passwordToken
  } catch (error) {
    return null
  }
}

export const getAuthTokenByEmail = async (email: string) => {
  await connectMongo()

  try {
    const token = await AuthTokenModel.findOne({ email })

    return token
  } catch (error) {
    return null
  }
}
