import jsonfile from 'jsonfile'
import assert from 'assert'
import { writeToDB } from '../service/dbService'

jsonfile.readFile('./output/aggregatedData.json', (err, data) => {
  assert.equal(null, err)
  writeToDB(data, 'aggregatedData')
})
jsonfile.readFile('./output/coursePerformanceData.json', (err, data) => {
  assert.equal(null, err)
  writeToDB(data, 'CoursePerformance')
})
jsonfile.readFile('./output/enrolmentTrendData.json', (err, data) => {
  assert.equal(null, err)
  writeToDB(data, 'EnrolmentTrend')
})
jsonfile.readFile('./output/facultyAndDeptData.json', (err, data) => {
  assert.equal(null, err)
  writeToDB(data, 'facultyDeptData')
})
jsonfile.readFile('./output/overallInstructorData.json', (err, data) => {
  assert.equal(null, err)
  writeToDB(data, 'OverallInstructor')
})
jsonfile.readFile('./output/UMIInstructorData.json', (err, data) => {
  assert.equal(null, err)
  writeToDB(data, 'UMIInstructor')
})
