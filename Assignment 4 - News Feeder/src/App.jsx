import Page from './Page.jsx'
import NewsProvider from './provider/NewsProvider.jsx'
import SearchProvider from './provider/SearchProvider.jsx'
import ThemeProvider from './provider/ThemeProvider.jsx'

const App = () => {
  return (
    <ThemeProvider>
      <SearchProvider>
        <NewsProvider>
          <Page />
        </NewsProvider>
      </SearchProvider>
    </ThemeProvider>
  )
}
export default App
