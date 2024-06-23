import { getRecipes } from '@/db/queries.js'
import RecipeCard from './RecipeCard.jsx'

const RecipeCardGrid = async () => {
  const recipes = await getRecipes()

  return (
    <div className='col-span-12 md:col-span-9'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8 justify-items-center'>
        {recipes?.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe._id} />
        })}
      </div>
    </div>
  )
}
export default RecipeCardGrid
