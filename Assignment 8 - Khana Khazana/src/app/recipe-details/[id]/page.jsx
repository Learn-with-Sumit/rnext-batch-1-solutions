import Food from '@/components/Details/Food.jsx'
import RecipeSteps from '@/components/Details/RecipeSteps.jsx'
import connectMongo from '@/db/conectMongo.js'
import { getRecipe, getRecipes } from '@/db/queries.js'
import { BASE_URL, HUNDRED, ZERO } from '@/util/constants.js'
import { notFound } from 'next/navigation.js'

// statically get all the recipes id
export async function generateStaticParams() {
  await connectMongo()
  const recipes = await getRecipes()

  return recipes.map((recipe) => ({
    id: recipe.id,
  }))
}

export async function generateMetadata({ params }) {
  // read route params
  const id = params.id

  // fetch data
  const recipe = await getRecipe(id)

  return {
    title: recipe?.name?.slice(ZERO, HUNDRED),
    description: recipe?.description?.slice(ZERO, HUNDRED),
    openGraph: {
      images: [
        {
          url: recipe.thumbnail,
          width: 1200,
          height: 600,
        },
      ],
    },
  }
}

const RecipeDetailsPage = async ({ params: { id } }) => {
  const recipe = await getRecipe(id)

  const jsonLd = {
    '@context': `${BASE_URL}/recipe-details/${id}`,
    '@type': 'recipe',
    name: recipe.name,
    image: recipe.image,
    description: recipe.description,
  }

  // if id is invalid, show not found page
  // there is a message coming from the response if recipe is not found
  if (recipe?.msg) {
    notFound()
  }

  return (
    <main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Food recipe={recipe} />
      <RecipeSteps recipe={recipe} />
    </main>
  )
}
export default RecipeDetailsPage
