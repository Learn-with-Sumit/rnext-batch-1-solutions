import RecipeCard from '@/components/Common/RecipeCard.jsx'
import connectMongo from '@/db/conectMongo.js'
import { getRecipeByCategory, getRecipes } from '@/db/queries.js'
import { ZERO } from '@/util/constants.js'
import getRndInteger from '@/util/getRandomInteger.js'

// statically get all the recipes category
export async function generateStaticParams() {
  await connectMongo()
  const recipes = await getRecipes()

  return recipes.map((recipe) => ({
    category: recipe.category,
  }))
}

export async function generateMetadata({ params: { category } }) {
  const recipes = await getRecipeByCategory(decodeURIComponent(category))

  return {
    title: decodeURIComponent(category),
    openGraph: {
      images: [
        {
          url:
            recipes.length > ZERO &&
            recipes[getRndInteger(1, recipes.length)].thumbnail, // get random recipes thumbnail as og image
          width: 1200,
          height: 600,
        },
      ],
    },
  }
}

const RecipeCategoryPage = async ({ params: { category } }) => {
  const recipes = await getRecipeByCategory(decodeURIComponent(category)) // so that special characters become plain strings e.g: Breakfast%20&%20Brunch -> Breakfast & Brunch

  // creating a json-LD to inject for this page
  const jsonLd = {
    '@context': 'https://lws-assignment8.vercel.app/',
    '@type': 'recipe category',
    category: decodeURIComponent(category),
  }

  return (
    <main>
      <section className='container py-8'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div>
          <h3 className='font-semibold text-xl'>
            {decodeURIComponent(category)}
          </h3>
          {recipes.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center'>
              {recipes.map((recipe) => {
                return <RecipeCard recipe={recipe} key={recipe._id} />
              })}
            </div>
          ) : (
            <div className='text-xl flex justify-center items-center'>
              No Recipes
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
export default RecipeCategoryPage
