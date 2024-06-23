import mongoose from 'mongoose'

const PasswordResetTokenSchema = new mongoose.Schema({
  email: String,
  token: {
    type: String,
    unique: true,
  },
  expires: Date,
})

export const PasswordResetTokenModel =
  mongoose.models.passwordResetToken ||
  mongoose.model('passwordResetToken', PasswordResetTokenSchema)
