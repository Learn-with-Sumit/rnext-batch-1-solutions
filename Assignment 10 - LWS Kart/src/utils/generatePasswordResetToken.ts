import { PasswordResetTokenModel } from '@/app/models/passwordResetTokenModel'
import { getPasswordResetTokenByEmail } from '@/db/queries/token.queries'

export const generatePasswordResetToken = async (email: string) => {
  const token = crypto.randomUUID()
  // expires after 1 hour
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await PasswordResetTokenModel.deleteOne({ _id: existingToken._id })
  }

  const passwordResetToken = await PasswordResetTokenModel.create({
    email,
    token,
    expires,
  })

  return passwordResetToken
}
export default generatePasswordResetToken
