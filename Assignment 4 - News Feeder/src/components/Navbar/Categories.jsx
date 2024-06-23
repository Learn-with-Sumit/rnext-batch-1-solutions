import { useContext } from 'react'
import { CATEGORIES } from '../../constants/constant.js'
import { NewsContext, SearchContext } from '../../context/index.js'
import { ThemeContext } from '../../context/index.js'

const Categories = () => {
  const { category, setCategory, newsData, error } = useContext(NewsContext)
  const { setSearchValue } = useContext(SearchContext)
  const { isDark } = useContext(ThemeContext)

  const handleCategory = (category) => {
    setSearchValue('')
    setCategory(category)
  }

  // dynamically setting the color of categories
  const setListClass = (cat) => {
    const categoryMatched = category.toLowerCase() === cat.toLowerCase()
    if ((isDark && categoryMatched) || (!isDark && categoryMatched)) {
      return 'text-green-500'
    } else if (isDark && !categoryMatched) {
      return 'text-white'
    } else {
      return 'text-black'
    }
  }

  return (
    <div className='container mx-auto mt-6'>
      {error ? (
        <p>No categories available...</p>
      ) : (
        <ul className='flex flex-wrap items-center justify-center gap-5 text-xs font-semibold lg:text-base'>
          {CATEGORIES.map((cat) => (
            <li
              onClick={() => handleCategory(cat)}
              className={setListClass(cat)}
              key={cat}
            >
              <a href={`#${cat}`}>{cat}</a>
            </li>
          ))}
          {/* TOTAL RESULTS */}
          <div className='mt-2'>
            <span className='bg-red-400 p-2 text-white rounded-l-md'>
              {newsData.data.totalResults}
            </span>
            <span className='bg-black p-2 text-white rounded-r-md'>NEWS</span>
          </div>
        </ul>
      )}
    </div>
  )
}
export default Categories
