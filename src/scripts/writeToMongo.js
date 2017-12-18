import jsonfile from 'jsonfile'
import assert from 'assert'
import { writeToDB, clearCollection } from '../service/dbService'
import * as collection from '../utils/constants'

const clearAndWrite = (data, collectionName) => {
  clearCollection(collectionName)
  writeToDB(data, collectionName)
}

jsonfile.readFile('./output/aggregatedData.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.aggregatedData)
})

jsonfile.readFile('./output/coursePerformanceData.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.coursePerformance)
})

jsonfile.readFile('./output/enrolmentTrendData.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.enrolmentTrend)
})

jsonfile.readFile('./output/facultyAndDeptData.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.facultyDeptData)
})

jsonfile.readFile('./output/overallInstructorData.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.overallInstructor)
})

jsonfile.readFile('./output/UMIInstructorData.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.umiInstructor)
})

jsonfile.readFile('./output/metaData.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.metaData)
})
