import jsonfile from 'jsonfile'
import assert from 'assert'
import { writeToDB, clearCollection } from '../service/dbService'

const clearAndWrite = (data, collectionName) => {
  clearCollection(collectionName)
  writeToDB(data, collectionName)
}

jsonfile.readFile('./output/aggregatedData.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, 'aggregatedData')
})

jsonfile.readFile('./output/coursePerformanceData.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, 'CoursePerformance')
})

jsonfile.readFile('./output/enrolmentTrendData.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, 'EnrolmentTrend')
})

jsonfile.readFile('./output/facultyAndDeptData.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, 'facultyDeptData')
})

jsonfile.readFile('./output/overallInstructorData.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, 'OverallInstructor')
})

jsonfile.readFile('./output/UMIInstructorData.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, 'UMIInstructor')
})
