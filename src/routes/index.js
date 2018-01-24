import { Router } from 'express'
import overview from './overview'
import exportReport from './exportReport'
import instructor from './instructor'

require('dotenv').config()

const routes = Router()

routes.get('/', (req, res) => {
  if (process.env.BUILD === 'PRODUCTION') {
    res.render('overview', { append: '/courseval' })
  } else res.render('overview')
})

routes.use('/overview', overview)

routes.use('/export', exportReport)

routes.use('/instructor', instructor)

export default routes
