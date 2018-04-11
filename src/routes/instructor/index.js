import { Router } from 'express'
import * as instructorDS from '../../service/instructorDataService'
import * as overviewDS from '../../service/overviewDataService'

const routes = Router()

routes.get('/', (req, res) => {
  if (process.env.BUILD === 'PRODUCTION') {
    res.render('instructor', { append: '/courseval' })
  } else res.render('instructor')
})

routes.get('/instructorOverview/:puid/:year', (req, res) => {
  instructorDS.dataForOverview(req.params.puid, req.params.year).then(data => res.send(data))
})

routes.get('/instructorOverview/:puid', (req, res) => {
  overviewDS.dataForOptions().then(data => {
    const instructors = data[0].instructors
    const selectedInstructor = instructors.find(instructor =>
      instructor.PUID === req.params.puid)
    res.send(selectedInstructor.terms)
  })
})

routes.get('/instructorRanking/:year/:minClassSize/:maxClassSize', (req, res) => {
  instructorDS.dataForInstructorRanking(req.params).then(data=> {
    res.send(data)
  })
})
export default routes
