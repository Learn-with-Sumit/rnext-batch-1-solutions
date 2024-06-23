import mongoose from 'mongoose'
import { product } from './userModel'

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userDetails: {
    firstName: String,
    lastName: String,
    region: String,
    address: String,
    city: String,
    phone: String,
    email: String,
  },
  items: [product],
  cost: {
    type: Number,
    required: true,
  },
})

export const OrdersModel =
  mongoose.models.orders || mongoose.model('orders', OrderSchema)
