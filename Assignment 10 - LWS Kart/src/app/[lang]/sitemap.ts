import { getAllProducts } from '@/db/queries/product.queries'

export default async function sitemap() {
  const products = await getAllProducts()
  const productEntitiesById = products.map(({ _id }) => ({
    url: `${process.env.BASE_URL}/product-details/${_id}`,
  }))

  return [
    {
      url: `${process.env.BASE_URL}`,
    },
    ...productEntitiesById,
  ]
}
