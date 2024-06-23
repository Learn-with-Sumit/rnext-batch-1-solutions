import RecipeCardGrid from '@/components/Common/RecipeCardGrid.jsx'
import Hero from '@/components/Home/Hero.jsx'
import RecipeContainer from '@/components/Home/RecipeContainer.jsx'
import RecipesList from '@/components/Home/RecipesList.jsx'
import { BASE_URL } from '@/util/constants.js'

export const metadata = {
  title: 'Khana Khazana',
  description: 'Food Website for food recipe like pizza, burger etc.',
  openGraph: {
    title: 'Khana Khazana',
    description:
      'Khana Khazana is a website of food recipe like pizza, burger etc.',
    images: [
      {
        url: 'https://i.ibb.co/Qf4HPxy/cover.png', // provided cover image is hosted on imgBB to create an og Image, share this page with the url to see the image in action
        width: 1200,
        height: 600,
      },
    ],
  },
}

export default function Home() {
  const jsonLd = {
    '@context': BASE_URL,
    '@type': 'Recipe Website - Khana Khazana',
    name: 'Khana Khazana',
  }

  return (
    <main>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <RecipeContainer>
        <RecipesList />
        <RecipeCardGrid />
      </RecipeContainer>
    </main>
  )
}
