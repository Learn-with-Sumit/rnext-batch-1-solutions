import { AuthTokenModel } from '@/app/models/TokenModel'
import { getAuthTokenByEmail } from '@/db/queries/token.queries'
import crypto from 'crypto'

export const generateAuthToken = async (email: string, remember: string) => {
  const accessToken = crypto.randomUUID()
  const refreshToken = crypto.randomUUID()

  // accessToken expires after 1 hour
  const accessTokenExpires = new Date(new Date().getTime() + 1 * 60 * 60 * 1000)

  let refreshTokenExpires

  if (remember === 'true') {
    // refreshToken expires after 120 days
    refreshTokenExpires = new Date(
      new Date().getTime() + 120 * 24 * 60 * 60 * 1000
    )
  } else {
    // refreshToken expires after 10 days
    refreshTokenExpires = new Date(
      new Date().getTime() + 10 * 24 * 60 * 60 * 1000
    )
  }

  const existingToken = await getAuthTokenByEmail(email)

  if (existingToken) {
    await AuthTokenModel.deleteOne({ _id: existingToken._id })
  }

  const authToken = await AuthTokenModel.create({
    email,
    accessToken,
    refreshToken,
    aTExp: accessTokenExpires,
    rTExp: refreshTokenExpires,
  })

  return authToken
}

export default generateAuthToken
