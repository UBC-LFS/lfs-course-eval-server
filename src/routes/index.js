import { Router } from 'express'
import overview from './overview'
import exportReport from './exportReport'
import instructor from './instructor'
import course from './course'

require('dotenv').config()

const routes = Router()

routes.get('/', (req, res) => {
  if (process.env.BUILD === 'PRODUCTION') {
    res.render('overview', { append: '/courseval' })
  } else res.render('overview')
})

routes.use('/course', course)

routes.use('/overview', overview)

routes.use('/export', exportReport)

routes.use('/instructor', instructor)

routes.get('/list', (req, res, next) => {
  const { title } = req.query

  if (title == null || title === '') {
    // You probably want to set the response HTTP status to 400 Bad Request
    // or 422 Unprocessable Entity instead of the default 500 of
    // the global error handler (e.g check out https://github.com/kbariotis/throw.js).
    // This is just for demo purposes.
    next(new Error('The "title" parameter is required'))
    return
  }

  res.render('overview', { title })
})

export default routes
