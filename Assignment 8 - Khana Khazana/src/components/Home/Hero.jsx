// import makeHeroText from '@/util/makeHeroText.js'
import { PiBowlFoodDuotone } from 'react-icons/pi'

const gradient =
  'bg-gradient-to-r from-teal-400 to-yellow-200 text-transparent bg-clip-text'

const Hero = () => {
  const heroText = 'Choose from thousands of '
  let heroTextHTML = '<p>'

  // making the 'o' letters different color, just for some creativity 🙂
  for (const letter of heroText) {
    if (letter.toLowerCase() === 'o') {
      heroTextHTML += `<span class="${gradient}">${letter}</span>`
    } else {
      heroTextHTML += letter
    }
  }

  heroTextHTML +=
    '<span class="underline underline-offset-6 text-yellow-400">recipes</span/></p>'

  return (
    <section className='container'>
      <div className="py-4 bg-[url('/assets/images/cover.png')] animate-up-down rounded-lg p-4 md:p-12 min-h-[450px] bg-cover grid place-items-center grid-cols-12">
        <div className='col-span-12 md:col-span-6'>
          <PiBowlFoodDuotone className='text-white text-5xl mb-1' />
          <h1
            dangerouslySetInnerHTML={{ __html: heroTextHTML }}
            className='font-bold text-3xl md:text-5xl shadow-lg text-white'
          ></h1>
          <p className='text-white my-4'>
            Appropriately integrate technically sound value with scalable
            infomediaries negotiate sustainable strategic theme areas
          </p>
        </div>
      </div>
    </section>
  )
}
export default Hero
