export const getUniqueCategories = (recipes) => {
  const categories = []
  recipes.forEach((recipe) => {
    if (!categories.includes(recipe.category)) {
      categories.push(recipe.category)
    }
  })
  return categories
}
