import mongoose, { Types } from 'mongoose'

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: 'users',
  },
  username: String,
  review: String,
  badReasonReview: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  productId: {
    type: Types.ObjectId,
    required: true,
    ref: 'products',
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const ProductSchema = new mongoose.Schema(
  {
    product_name: String,
    stock_count: Number,
    brand: String,
    category: String,
    SKU: String,
    price: Number,
    discount_price: Number,
    description: String,
    new_arrival: Boolean,
    trending: Boolean,
    size: {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL'],
    },
    image: String,
    color: String,
    reviews: {
      type: [ReviewSchema],
      required: false,
    },
    otherImages: [String],
  },
  { timestamps: true }
)

export const ProductModel =
  mongoose.models.products || mongoose.model('products', ProductSchema)
