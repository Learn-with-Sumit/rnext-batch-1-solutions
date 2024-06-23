const fs = require('fs/promises')

let newsData = []
const categories = [
  'general',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
]

const topHeadlines = async (req, res) => {
  if (newsData.length === 0) {
    const data = await fs.readFile('./data/news.json', 'utf8')
    newsData = JSON.parse(data)
  }

  const { category } = req.query

  if (category) {
    if (!categories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' })
    }

    res.json(newsData[category])
  } else {
    res.json(newsData.general)
  }
}

const search = async (req, res) => {
  if (newsData.length === 0) {
    const data = await fs.readFile('./data/news.json', 'utf8')
    newsData = JSON.parse(data)
  }

  const { q } = req.query

  if (!q) {
    return res.status(400).json({ message: 'Invalid query' })
  }

  // Search on All Category
  const result = {
    totalResults: 0,
    result: [],
  }
  for (const category of categories) {
    let matched = newsData[category].articles.filter((news) =>
      news.title.toLowerCase().includes(q.toLowerCase())
    )

    if (matched) result.result.push(...matched)
  }

  result.totalResults = result.result.length

  res.json(result)
}

module.exports = { topHeadlines, search }
