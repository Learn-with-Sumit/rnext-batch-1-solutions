import Image from 'next/image.js'
import Link from 'next/link.js'
import CookTime from '../Icons/CookTime.jsx'
import Prep from '../Icons/Prep.jsx'
import Servings from '../Icons/Servings.jsx'
import FoodButtons from './FoodButtons.jsx'

const Food = ({ recipe }) => {
  const {
    name,
    description,
    activeTime,
    totalTime,
    image,
    category,
    serves,
    _id: id,
  } = recipe
  return (
    <section>
      <div className='grid grid-cols-12 container gap-8 justify-items-center'>
        <div className='col-span-12 md:col-span-6 h-min overflow-hidden rounded-md'>
          <Image
            height={500}
            width={500}
            src={image}
            alt='food-recipe'
            className='w-full h-full rounded-lg object-contain hover:scale-105 transition-all duration-300'
          />
        </div>
        <div className='col-span-12 md:col-span-6 py-8 flex flex-col justify-center'>
          <h2 className='font-semibold text-4xl lg:w-8/12 leading-10'>
            {name}
          </h2>
          <Link
            href={`/recipe/${category}`}
            className='text-xs text-[#eb4a36] italic my-2 hover:underline underline-offset-4 duration-300'
          >
            {category}
          </Link>
          <p className='text-gray-600 text-sm my-6 leading-6'>{description}</p>
          <div className='flex gap-4 justify-center divide-x my-12'>
            <div className='flex-1 text-center'>
              <Prep />
              <h3 className='font-medium text-lg text-gray-700 mt-2'>
                Prep time
              </h3>
              <p className='text-gray-500 text-sm'>{activeTime} </p>
            </div>
            <div className='flex-1 text-center'>
              <CookTime />
              <h3 className='font-medium text-lg text-gray-700 mt-2'>
                Cook time
              </h3>
              <p className='text-gray-500 text-sm'>{totalTime}</p>
            </div>
            <div className='flex-1 text-center'>
              <Servings />
              <h3 className='font-medium text-lg text-gray-700 mt-2'>
                Servings
              </h3>
              <p className='text-gray-500 text-sm'>{serves}</p>
            </div>
          </div>
          <FoodButtons recipeId={id.toString()} />
        </div>
      </div>
    </section>
  )
}
export default Food
