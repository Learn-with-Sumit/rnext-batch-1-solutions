import {
  DELETE_BLOG,
  INCREMENT_PAGE,
  SET_BLOGS,
  SET_ERROR,
  SET_HAS_MORE,
  SET_LOADING,
} from '../constants.js'

const initialState = {
  blogs: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: false,
}

const blogReducer = (state, action) => {
  switch (action.type) {
    case SET_BLOGS:
      return {
        ...state,
        blogs: [...state.blogs, ...action.payload],
      }
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload),
      }
    case INCREMENT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      }
    case SET_HAS_MORE:
      return {
        ...state,
        hasMore: action.payload,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      }
  }
}

export { blogReducer, initialState }
