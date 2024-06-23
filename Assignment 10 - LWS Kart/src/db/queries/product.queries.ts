import { ProductModel } from '@/app/models/productModel'
import constructFilterPipeline from '@/utils/constructFilterPipeline'
import connectMongo from '../connectMongo'

export const getProductsCount = async (fields?: IProductFilter) => {
  try {
    await connectMongo()
    const { filter } = constructFilterPipeline(fields)

    return await ProductModel.countDocuments(filter)
  } catch (error) {
    throw error
  }
}

export const getRandomProductId = async () => {
  try {
    await connectMongo()

    // fetch all product IDs
    const productIds = await ProductModel.distinct('_id')

    if (productIds.length === 0) {
      return { msg: 'No products available' }
    }

    // select a random product ID
    const randomIndex = Math.floor(Math.random() * productIds.length)
    const randomProductId = productIds[randomIndex]

    return randomProductId
  } catch (error) {
    throw error
  }
}

export const getAllProducts = async (fields?: IProductFilter) => {
  try {
    await connectMongo()

    // let the field go through the filter pipeline
    const { filter, limit, skip, sort } = constructFilterPipeline(fields)

    const products = (await ProductModel.find(filter)
      .sort(sort)
      .limit(limit)
      .skip(skip)) as IProduct[]

    return products
  } catch (error) {
    throw error
  }
}

export const getRandomLowDiscountProduct = async () => {
  try {
    await connectMongo()

    // get random products with price lower than 200 and stock count greater than 0
    const products = await ProductModel.find({
      discount_price: { $lt: 200 },
      stock_count: { $gt: 0 },
    }).lean()

    if (products.length === 0) {
      return { msg: 'No product found with a low discount price' }
    }

    // shuffle the products array to get a random product
    const randomIndex = Math.floor(Math.random() * products.length)
    const randomProduct = products[randomIndex]

    return randomProduct
  } catch (error) {
    throw error
  }
}
export const getSearchedProducts = async (query: string, limit = 0) => {
  const queryRegex = new RegExp(query, 'i')
  try {
    await connectMongo()
    const products: IProduct[] = await ProductModel.find({
      $or: [
        { product_name: { $regex: queryRegex } },
        { description: { $regex: queryRegex } },
      ],
    })
      .limit(limit)
      .lean()
    return products
  } catch (error) {
    throw error
  }
}
const SELECTED_PRODUCT_MAX_THRESHOLD = 7 // on the front page, only show 7 items and a see more button that takes to the shop page
export const getSelectedProducts = async (field: string) => {
  try {
    await connectMongo()
    const products: IProduct[] = await ProductModel.find({
      [field]: true,
    })
      .limit(SELECTED_PRODUCT_MAX_THRESHOLD)
      .lean()
    return products
  } catch (error) {
    throw error
  }
}
export const getTotalProductCount = async (query?: string) => {
  try {
    await connectMongo()
    let count: IProduct[]

    if (!query) {
      count = await ProductModel.countDocuments().lean()
    } else {
      // to get total documents of the searched product for the search suggestion
      const queryRegex = new RegExp(query, 'i')
      count = await ProductModel.find({
        $or: [
          { product_name: { $regex: queryRegex } },
          { description: { $regex: queryRegex } },
        ],
      })
        .countDocuments()
        .lean()
    }

    return count
  } catch (error) {
    throw error
  }
}

export const getSingleProduct = async (id: string, distinct?: string) => {
  try {
    await connectMongo()
    if (distinct) {
      const product = await ProductModel.findById(id).distinct(
        distinct as string
      )
      if (!product) {
        return { msg: 'No product found' }
      }
      return product
    } else {
      const product = await ProductModel.findById(id)
      if (!product) {
        return { msg: 'No product found' }
      }
      return product
    }
  } catch (error) {
    throw error
  }
}

export const getRelatedProducts = async (
  category: string,
  excludeProductId: string
) => {
  try {
    await connectMongo()

    // getting related products based on category
    const products = await ProductModel.find({
      category,
      _id: { $ne: excludeProductId }, // while getting related products, exclude the current product
    }).lean()

    if (products.length === 0) {
      return { msg: 'No product found' }
    }

    // showing random products that matches category and showing only 4 as template
    const shuffledProducts = products.sort(() => Math.random() - 0.5)
    const randomProducts = shuffledProducts.slice(0, 4)

    return randomProducts
  } catch (error) {
    throw error
  }
}

export const getAllCategories = async () => {
  try {
    await connectMongo()
    const uniqueCategories = await ProductModel.distinct('category').lean()
    const categoriesPromises = uniqueCategories.map(async (category) => ({
      [category]: await ProductModel.countDocuments({ category }),
    }))
    const categories = await Promise.all(categoriesPromises)
    return categories
  } catch (error) {
    throw error
  }
}
