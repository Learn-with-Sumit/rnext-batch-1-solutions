import { model, models, Schema } from 'mongoose'

const schema = new Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  favorites: {
    type: [String],
    default: [],
  },
})

export const UserModel = models.users || model('users', schema)
