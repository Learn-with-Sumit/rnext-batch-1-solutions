import { useQueryClient } from '@tanstack/react-query'
import { Reorder } from 'framer-motion'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FavoriteContext } from '../../context/index.js'
import useClearAllFav from '../../hooks/api/useClearAllFav.js'
import useFavorite from '../../hooks/api/useFavorite.js'
import useReorderBlog from '../../hooks/api/useReorderBlog.js'
import useAuth from '../../hooks/useAuth.js'
import EmptyResponse from '../common/EmptyResponse.jsx'
import Error from '../common/Error.jsx'
import PopularSkeleton from './PopularSkeleton.jsx'

const FavoriteBlogs = () => {
  const navigate = useNavigate()
  const { isLoading, isError, error } = useFavorite()
  const { favorites, setFavorites } = useContext(FavoriteContext)
  const [isDragging, setIsDragging] = useState(false)
  const { handleReorder, favoritesForReorder } = useReorderBlog()
  const queryClient = useQueryClient()
  const { auth } = useAuth()
  const { mutate } = useClearAllFav()

  let content = null

  const isLoggedIn = auth?.token?.accessToken

  const clearAllFavorites = () => {
    if (isLoggedIn) {
      mutate(favorites, {
        onSuccess: () => {
          toast.success('Cleared all favorites', { autoClose: 500 })
          queryClient.invalidateQueries({ queryKey: 'favorites' })
          handleReorder([])
          setFavorites([])
        },
      })
    }
    localStorage.removeItem('favoriteBlogs')
    localStorage.removeItem('favoriteOrder')
  }

  if (isLoading) {
    content = Array.from({ length: 2 }).map((_, index) => (
      <PopularSkeleton key={index} /> // show skeleton
    ))
  }

  if (!isLoading && isError) {
    content = <Error error={error} message='No favorites' />
  }

  if (!isLoading && !isError && favorites?.length === 0) {
    content = <EmptyResponse message='No favorite blogs' />
  }

  if (!isLoading && !isError && favorites?.length > 0) {
    content = (
      <ul className='space-y-5 my-5'>
        <Reorder.Group
          axis='y'
          values={favoritesForReorder?.map((fav) => fav?.id)}
          onReorder={handleReorder}
        >
          {favoritesForReorder.map(({ id, title, tags }) => {
            return (
              <Reorder.Item
                onDrag={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                value={id}
                key={id}
              >
                <div
                  onClick={() => {
                    // if a Link or React router is used here, things become too complex, so using a navigate and also preventing the routing when the user drags with an early return
                    if (isDragging) return
                    navigate(`blog/${id}`)
                  }}
                >
                  <>
                    <h3 className='text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer'>
                      {title}
                    </h3>
                    <p className='text-slate-600 text-sm'>
                      {/* adds a '#' in front of each tags */}
                      {tags
                        ?.split(', ')
                        .map((tag) => `#${tag}`)
                        .join(', ')}
                    </p>
                  </>
                </div>
              </Reorder.Item>
            )
          })}
        </Reorder.Group>
      </ul>
    )
  }

  return (
    <>
      <div className='flex justify-between'>
        <h3 className='text-slate-300 text-xl lg:text-2xl font-semibold'>
          Your Favourites ❤️
        </h3>
        {favorites.length > 0 && isLoggedIn && (
          <button
            onClick={clearAllFavorites}
            className='bg-red-500 hover:bg-red-600 transition-all p-1 rounded'
          >
            Clear all
          </button>
        )}
      </div>
      {content}
    </>
  )
}
export default FavoriteBlogs
