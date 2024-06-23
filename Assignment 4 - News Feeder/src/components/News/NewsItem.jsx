import Info from './Info.jsx'
import Thumbnail from './Thumbnail.jsx'

const NewsItem = ({ left, right, article }) => {
  const { urlToImage, content, author } = article

  if (left) {
    return (
      <div className='col-span-12 grid grid-cols-12 gap-4'>
        <Info article={article} />
        <Thumbnail content={content} author={author} imgUrl={urlToImage} />
      </div>
    )
  }

  if (right) {
    return (
      <div className='col-span-12 mb-6 md:col-span-8'>
        <Info article={article} newsFor='right' />
      </div>
    )
  }
}
export default NewsItem
