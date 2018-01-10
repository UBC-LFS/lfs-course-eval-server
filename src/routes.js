import { Router } from 'express'
import * as overviewDS from './service/overviewDataService'
import * as exportDS from './service/exportDataService'
import * as instructorDS from './service/instructorDataService'

require('dotenv').config()

const routes = Router()

routes.get('/', (req, res) => {
  if (process.env.BUILD === 'PRODUCTION') {
    res.render('overview', { append: '/courseval' })
  } else res.render('overview')
})

routes.get('/course', (req, res) => {
  if (process.env.BUILD === 'PRODUCTION') {
    res.render('course', { append: '/courseval' })
  } else res.render('course')
})

routes.get('/instructor', (req, res) => {
  if (process.env.BUILD === 'PRODUCTION') {
    res.render('instructor', { append: '/courseval' })
  } else res.render('instructor')
})

routes.get('/export', (req, res) => {
  if (process.env.BUILD === 'PRODUCTION') {
    res.render('export', { append: '/courseval' })
  } else res.render('export')
})
// old version
// routes.get('/overview/UMIVsDispersion', (req, res) => {
//   overviewDS.dataForUMIVSDispersion().then(data => res.send(data))
// })
// new version that dynamically fetches data depending on filter selection
routes.get('/overview/UMIVsDispersion/:year/:term/:dept/:meetsMin', (req, res) => {
  overviewDS.dataForUMIVSDispersion(req.params).then(data => res.send(data))
})

routes.get('/overview/options', (req, res) => {
  overviewDS.dataForOptions().then(data => res.send(data))
})

routes.get('/overview/UMIInstructor', (req, res) => {
  overviewDS.dataForUMIInstructor().then(data => res.send(data))
})

routes.get('/overview/OverallInstructor', (req, res) => {
  overviewDS.dataForOverallInstructor().then(data => res.send(data))
})

routes.get('/overview/CoursePerformance', (req, res) => {
  overviewDS.dataForCoursePerformance().then(data => res.send(data))
})

routes.get('/overview/EnrolmentTrend', (req, res) => {
  overviewDS.dataForEnrolmentTrend().then(data => res.send(data))
})

routes.get('/overview/FacultyDept', (req, res) => {
  overviewDS.dataForFaculyAndDept().then(data => res.send(data))
})

routes.get('/overview/Overview/:year', (req, res) => {
  overviewDS.dataForOverview(req.params.year).then(data => res.send(data))
})

routes.get('/instructor/instructorOverview/:instructor/:year', (req, res) => {
  instructorDS.dataForOverview(req.params.instructor, req.params.year).then(data => res.send(data))
})

routes.get('/export/options', (req, res) => {
  exportDS.dataForOptions().then(data => res.send(data))
})

routes.get('/export/:fromYear/:toYear/:dept', (req, res) => {
  exportDS.dataForStats(req.params).then(data => res.send(data))
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

  res.render('overview', { title })
})

export default routes
