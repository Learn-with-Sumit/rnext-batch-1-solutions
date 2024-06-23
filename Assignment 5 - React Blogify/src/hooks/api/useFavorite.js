import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FavoriteContext } from '../../context/index.js'
import useAuth from '../useAuth.js'
import useAxios from './useAxios.js'

const useFavorite = () => {
  const { favorites, setFavorites, localFavorites } =
    useContext(FavoriteContext)
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { auth } = useAuth()
  const customFetch = useAxios()
  const isLoggedIn = auth?.token?.accessToken // retrieve the accessToken

  const mutation = useMutation({
    mutationFn: async () => customFetch.patch(`blogs/${id}/favourite`),
    onSuccess: (data) => {
      // changing local state
      if (data.data.isFavourite) {
        setFavorites((prev) => [...prev, data.data])
        // show toast
        toast.success(`${data.data.title} added to favorites`, {
          autoClose: 1000,
        })
      }
      if (!data.data.isFavourite) {
        setFavorites((prev) => prev.filter((blog) => blog.id !== data.data.id))
        // show toast
        toast.info(`${data.data.title} removed from favorites`, {
          autoClose: 1000,
        })
      }
      // invalidating query
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })

  // query to get favorites
  const { data, isLoading, isError, error, isFetched } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => customFetch.get(`blogs/favourites`),
    enabled: !!isLoggedIn, // to prevent unnecessary calls if the user is not logged in
  })
  // on mount, fetch the favorite status as an array of ids if they have made the blog favorite
  useEffect(() => {
    if (isLoggedIn) {
      if (!isLoading && !isError && data.data.blogs.length > 0) {
        const favoriteFromServer = data.data.blogs
        setFavorites(favoriteFromServer)
      }
    }
    if (!isLoggedIn) {
      setFavorites(JSON.parse(localStorage.getItem('favoriteBlogs')) || [])
    }
  }, [isError, isLoggedIn, isLoading, setFavorites, data?.data?.blogs])

  const addToFavorites = (blog) => {
    // if user is not logged in, add only on local storage
    if (!isLoggedIn) {
      const newFavorites = [...localFavorites, blog]
      setFavorites(newFavorites)
      localStorage.setItem('favoriteBlogs', JSON.stringify(newFavorites))
    } else {
      mutation.mutate(blog.id)
    }
  }

  const removeFromFavorites = (blog) => {
    // if user is not logged in, remove only on local storage
    if (!isLoggedIn) {
      const newFavorites = favorites.filter((fav) => fav.id !== blog.id)
      setFavorites(newFavorites)
      localStorage.setItem('favoriteBlogs', JSON.stringify(newFavorites))
    } else {
      mutation.mutate(blog.id)
    }
  }

  return {
    addToFavorites,
    setFavorites,
    removeFromFavorites,
    isLoading,
    isError,
    favorites,
    error,
    isFetched,
  }
}
export default useFavorite
