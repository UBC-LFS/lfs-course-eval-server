import { Router } from 'express'
import * as instructorDS from '../../service/instructorDataService'

const routes = Router()

routes.get('/', (req, res) => {
  if (process.env.BUILD === 'PRODUCTION') {
    res.render('instructor', { append: '/courseval' })
  } else res.render('instructor')
})

routes.get('/instructorOverview/:puid/:year', (req, res) => {
  instructorDS.dataForOverview(req.params.puid, req.params.year).then(data => res.send(data))
})

export default routes
