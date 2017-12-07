import { Router } from 'express'
import {
  dataForEnrolmentTrend,
  dataForOverallInstructor,
  dataForCoursePerformance,
  dataForUMIVSDispersion,
  dataForUMIInstructor,
  dataForFaculyAndDept,
  dataForStats
} from './service/dataService'

require('dotenv').config()

const routes = Router()

const removeIDs = (arr) => arr.map(x => {
  delete x['_id']
  return x
})

routes.get('/', (req, res) => {
  if (process.env.BUILD === 'PRODUCTION') {
    res.render('index', { title: 'Courseval Visualization', append: '/courseval' })
  } else res.render('index', { title: 'Courseval Visualization' })
})

routes.get('/data/UMIDispersion', (req, res) => {
  dataForUMIVSDispersion().then(data => res.send(removeIDs(data)))
})

routes.get('/data/UMIInstructor', (req, res) => {
  dataForUMIInstructor().then(data => res.send(removeIDs(data)))
})

routes.get('/data/OverallInstructor', (req, res) => {
  dataForOverallInstructor().then(data => res.send(removeIDs(data)))
})

routes.get('/data/CoursePerformance', (req, res) => {
  dataForCoursePerformance().then(data => res.send(removeIDs(data)))
})

routes.get('/data/EnrolmentTrend', (req, res) => {
  dataForEnrolmentTrend().then(data => res.send(removeIDs(data)))
})

routes.get('/data/FacultyDept', (req, res) => {
  dataForFaculyAndDept().then(data => res.send(removeIDs(data)))
})

routes.get('/data/:fromYear/:toYear/:dept', (req, res) => {
  dataForStats(req.params.fromYear, req.params.toYear, req.params.dept).then(data => res.send(data))
})

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

  res.render('index', { title })
})

export default routes
