import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  if (process.env.BUILD === 'PRODUCTION') {
    res.render('course', { append: '/courseval' })
  } else res.render('course')
})

export default routes
