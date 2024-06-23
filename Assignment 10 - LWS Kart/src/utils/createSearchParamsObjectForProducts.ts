const createSearchParamsObjectForProducts = (
  searchParams: IShopSearchParams
) => {
  const {
    category,
    min,
    max,
    query,
    size,
    color,
    limit,
    skip,
    sort,
    stock_status = 'inStock',
  } = searchParams
  const categories = category?.split(',')

  return {
    categories,
    min,
    max,
    size,
    query,
    color,
    limit,
    skip,
    sort,
    inStock: stock_status === 'inStock',
  }
}
export default createSearchParamsObjectForProducts
