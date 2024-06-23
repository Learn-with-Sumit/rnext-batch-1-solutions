import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ScrollToTopOnRouteChange } from './components/common/ScrollToTopOnRouteChange.jsx'
import './index.css'
import Blog from './pages/Blog.jsx'
import EditBlog from './pages/EditBlog.jsx'
import ErrorPage from './pages/Error.jsx'
import PrivateRoute from './pages/PrivateRoute.jsx'
import Profile from './pages/Profile.jsx'
import SingleBlog from './pages/SingleBlog.jsx'
import WriteBlog from './pages/WriteBlog.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        {/* Moving between routes will scroll to top automatically */}
        <ScrollToTopOnRouteChange />
        <App />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Blog />,
        index: true,
      },
      {
        path: '/blog/:id',
        element: <SingleBlog />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/profile/:id',
        element: <Profile />,
      },
      {
        path: '/write-blog',
        element: (
          <PrivateRoute>
            <WriteBlog />
          </PrivateRoute>
        ),
      },
      {
        path: '/edit-blog/:id',
        element: (
          <PrivateRoute>
            <EditBlog />
          </PrivateRoute>
        ),
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
