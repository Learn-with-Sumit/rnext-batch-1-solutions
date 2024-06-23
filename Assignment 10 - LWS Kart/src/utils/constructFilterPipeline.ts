export const constructFilterPipeline = (fields?: IProductFilter) => {
  const {
    query,
    categories,
    min,
    max,
    size,
    color,
    limit = 10,
    skip = 0,
    sort: sortBy,
    inStock = true,
  } = fields ?? {}
  const queryRegex = query ? new RegExp(query, 'i') : undefined

  const filter: any = {}

  // search using product name or description
  if (queryRegex) {
    filter.$or = [
      { product_name: queryRegex },
      { description: { $regex: queryRegex } },
    ]
  }

  if (categories) {
    filter.category = { $in: categories }
  }

  if (min !== undefined && max !== undefined) {
    filter.discount_price = { $gte: min, $lte: max }
  }

  if (size) {
    filter.size = size
  }

  if (color) {
    filter.color = color
  }

  if (inStock === true) {
    filter.stock_count = { $gte: 1 }
  }
  if (inStock === false) {
    filter.stock_count = { $lte: 0 }
  }

  // construct sort object
  let sort: any = {}
  if (sortBy) {
    switch (sortBy) {
      case 'price(high)':
        sort = { discount_price: -1 }
        break
      case 'price(low)':
        sort = { discount_price: 1 }
        break
      case 'trending':
        sort = { trending: -1 }
        break
      case 'new_arrival':
        sort = { new_arrival: -1 }
        break
      default:
        sort = {}
    }
  }

  return { filter, limit, skip, sort }
}
export default constructFilterPipeline
