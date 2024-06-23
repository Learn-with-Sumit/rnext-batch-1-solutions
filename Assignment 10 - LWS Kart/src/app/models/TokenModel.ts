import mongoose from 'mongoose'

const AuthTokenSchema = new mongoose.Schema({
  email: String,
  accessToken: {
    type: String,
    required: true,
  },
  aTExp: Date,
  refreshToken: {
    type: String,
    required: true,
  },
  rTExp: Date,
})

export const AuthTokenModel =
  mongoose.models.authTokens || mongoose.model('authTokens', AuthTokenSchema)
