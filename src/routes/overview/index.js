import { Router } from 'express'
import * as overviewDS from '../../service/overviewDataService'

const routes = Router()

routes.get('/UMIVsDispersion/:year/:term/:dept/:meetsMin', (req, res) => {
  overviewDS.dataForUMIVSDispersion(req.params).then(data => res.send(data))
})

routes.get('/options', (req, res) => {
  overviewDS.dataForOptions().then(data => res.send(data))
})

routes.get('/UMIInstructor', (req, res) => {
  overviewDS.dataForUMIInstructor().then(data => res.send(data))
})

routes.get('/OverallInstructor', (req, res) => {
  overviewDS.dataForOverallInstructor().then(data => res.send(data))
})

routes.get('/CoursePerformance', (req, res) => {
  overviewDS.dataForCoursePerformance().then(data => res.send(data))
})

routes.get('/EnrolmentTrend', (req, res) => {
  overviewDS.dataForEnrolmentTrend().then(data => res.send(data))
})

routes.get('/FacultyDept', (req, res) => {
  overviewDS.dataForFaculyAndDept().then(data => res.send(data))
})

routes.get('/Overview/:year', (req, res) => {
  overviewDS.dataForOverview(req.params.year).then(data => res.send(data))
})

export default routes
