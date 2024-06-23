import { getRecipes } from '@/db/queries.js'
import { getUniqueCategories } from '@/util/getUniqueCategories.js'
import Link from 'next/link.js'

const RecipesList = async () => {
  const recipes = await getRecipes()

  // for as many categories in the recipes data, get the unique ones only
  const categories = getUniqueCategories(recipes)

  return (
    <div className='col-span-12 md:col-span-3'>
      <h3 className='font-bold text-xl'>Recipes</h3>
      <ul className='pl-2 my-6 space-y-4 text-gray-500 text-sm'>
        {categories.map((category) => (
          <li
            className='hover:underline underline-offset-2 hover:text-blue-500 duration-300 hover:translate-x-2'
            key={category}
          >
            <Link href={`recipe/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default RecipesList
