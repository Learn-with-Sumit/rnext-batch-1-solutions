import { useEffect, useState } from 'react'
import { INITIAL_CATEGORY } from '../constants/constant.js'
const useNewsQuery = (search) => {
  const [newsData, setNewsData] = useState({
    data: {},
    message: '',
  })
  const baseUrl = import.meta.env.VITE_API_URL
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [category, setCategory] = useState(INITIAL_CATEGORY) // top headlines and general both have same results so initial category is general

  // setting the base url based on category or search
  const fetchURL = search
    ? `${baseUrl}search?q=${search}`
    : `${baseUrl}top-headlines?category=${category.toLowerCase()}`

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true) // loading state
        const res = await fetch(fetchURL)
        if (!res.ok) {
          const errorMessage = `News Fetching Failed ${res.status}`
          throw new Error(errorMessage)
        }
        const data = await res.json()
        setNewsData((prevData) => ({ ...prevData, data })) // data arrived state
      } catch (error) {
        setError(error) // error state
      } finally {
        setLoading(false)
      }
    }

    let ignore = false

    if (!ignore) {
      fetchNews()
    }

    return () => (ignore = true)
  }, [category, fetchURL])

  return { newsData, setNewsData, loading, error, category, setCategory }
}
export default useNewsQuery
