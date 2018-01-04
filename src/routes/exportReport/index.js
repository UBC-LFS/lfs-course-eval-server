import { Router } from 'express'
import * as exportDS from '../../service/exportDataService'

const routes = Router()

routes.get('/', (req, res) => {
  if (process.env.BUILD === 'PRODUCTION') {
    res.render('export', { append: '/courseval' })
  } else res.render('export')
})

routes.get('/options', (req, res) => {
  exportDS.dataForOptions().then(data => res.send(data))
})

routes.get('/:fromYear/:toYear/:dept', (req, res) => {
  exportDS.dataForStats(req.params).then(data => res.send(data))
})

export default routes
