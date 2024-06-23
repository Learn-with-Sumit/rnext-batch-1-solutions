import { getRecipes } from '@/db/queries.js'
import { BASE_URL } from '@/util/constants.js'

export default async function sitemap() {
  const recipes = await getRecipes()
  const recipeEntriesById = recipes.map(({ id }) => ({
    url: `${BASE_URL}/recipe-details/${id}`,
  }))

  return [
    {
      url: `${BASE_URL}`,
    },
    ...recipeEntriesById,
  ]
}
