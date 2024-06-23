import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/common/Footer.jsx'
import Header from './components/common/Header.jsx'
import ScrollProgress from './components/misc/ScrollProgress.jsx'
import ScrollToTop from './components/misc/ScrollToTop.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import FavoriteProvider from './providers/FavoriteProvider.jsx'
import SearchProvider from './providers/SearchProvider.jsx'

const App = () => {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <SearchProvider>
        <FavoriteProvider>
          <AuthProvider>
            <Header />
            <Outlet />
          </AuthProvider>
        </FavoriteProvider>
      </SearchProvider>
      <Footer />
      <ToastContainer />
    </>
  )
}
export default App
