import { useContext } from 'react'
import { NewsContext, SearchContext } from '../context/index.js'
import useNewsQuery from '../hooks/useNewsQuery.js'

const NewsProvider = ({ children }) => {
  const { searchValue } = useContext(SearchContext)
  const { newsData, setNewsData, loading, setCategory, category, error } =
    useNewsQuery(searchValue)
  return (
    <NewsContext.Provider
      value={{
        newsData,
        setNewsData,
        loading,
        setCategory,
        category,
        error,
        searchValue,
      }}
    >
      {children}
    </NewsContext.Provider>
  )
}
export default NewsProvider
