import customFetch from './customFetch.js'

export const getBlogs = async (page) => {
  try {
    const data = await customFetch.get(`blogs?page=${page}&limit=10`) // show 10 blogs per page
    return data
  } catch (error) {
    return error
  }
}
