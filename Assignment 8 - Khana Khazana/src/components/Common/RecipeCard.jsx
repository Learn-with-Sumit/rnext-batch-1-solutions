import Image from 'next/image.js'
import Link from 'next/link.js'

const RecipeCard = ({ recipe }) => {
  const { name, rating, thumbnail, author, _id: id } = recipe

  return (
    <Link
      href={`/recipe-details/${id}`}
      className='card hover:-translate-y-1 hover:scale-[102%] duration-200 focus:scale-[95%] group'
    >
      <div className='h-min overflow-hidden rounded-md shadow-lg'>
        <Image
          width={3000}
          height={3000}
          src={thumbnail}
          className='rounded-md object-contain hover:scale-105 transition-all duration-300'
          alt='food-image'
        />
      </div>
      <h4 className='my-2 group-hover:text-blue-500 group-hover:underline underline-offset-8 transition-all duration-300'>
        {name}
      </h4>
      <div className='py-2 flex justify-between text-xs text-gray-500'>
        <span className=' flex gap-1 '>
          <div
            className='group-hover:scale-125
              group-hover:rotate-180 transition-all duration-300'
          >
            ⭐️
          </div>
          <p>{rating}</p>
        </span>
        <span className='group-hover:text-red-500 transition-all duration-300'>
          By: {author}
        </span>
      </div>
    </Link>
  )
}
export default RecipeCard
