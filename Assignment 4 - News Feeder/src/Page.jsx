import { useContext } from 'react'
import Categories from './components/Navbar/Categories.jsx'
import Footer from './components/Footer.jsx'
import LeftNews from './components/News/LeftNews.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import NewsContainer from './components/News/NewsContainer.jsx'
import NewsItem from './components/News/NewsItem.jsx'
import RightNews from './components/News/RightNews.jsx'
import { NewsContext, ThemeContext } from './context/index.js'

const Page = () => {
  const { newsData, searchValue } = useContext(NewsContext)
  // if user searches show those data or else show based on category
  const data = !searchValue ? newsData?.data?.articles : newsData?.data?.result
  const { isDark } = useContext(ThemeContext)

  return (
    <div className={`${isDark ? 'bg-gray-700' : ''}`}>
      <Navbar>
        <Categories />
      </Navbar>
      <NewsContainer>
        {/* keeping the image news for the left part */}
        <LeftNews>
          {data?.map(
            (article) =>
              article.urlToImage && (
                <NewsItem
                  article={article}
                  key={crypto.randomUUID()}
                  left={true}
                />
              )
          )}
        </LeftNews>
        <RightNews>
          {/* keeping the no image news for the right part */}
          {data?.map(
            (article) =>
              !article.urlToImage && (
                <NewsItem
                  article={article}
                  key={crypto.randomUUID()}
                  right={true}
                />
              )
          )}
        </RightNews>
      </NewsContainer>
      <Footer />
    </div>
  )
}
export default Page
