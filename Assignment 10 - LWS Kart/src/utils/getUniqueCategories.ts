export const getUniqueCategories = (products: IProduct[]) => {
  const categories: string[] = []
  products.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category)
    }
  })
  return categories
}
