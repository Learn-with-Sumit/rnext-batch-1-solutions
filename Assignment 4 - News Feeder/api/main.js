// express boilerplate
const express = require('express')
const { topHeadlines, search } = require('./controller/news.controller')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/v2/top-headlines', topHeadlines)

app.get('/v2/search', search)

// Not Found Middleware
app.use((req, res, next) => {
  res.status(404).send('Page not found')
})

// Error Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong')
})

app.listen(8000, () => {
  console.log('Server is running on port 8000\n')
  console.log('Available Enpoints:')

  const host = 'http://localhost:8000'

  console.log(`GET ${host}/v2/top-headlines?category=general\n`)
  console.log(`GET ${host}/v2/search?q=Develop`)
})
