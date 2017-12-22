import jsonfile from 'jsonfile'
import assert from 'assert'
import { writeToDB, clearCollection } from '../service/dbService'
import * as collection from '../utils/constants'

const clearAndWrite = (data, collectionName) => {
  clearCollection(collectionName)
  writeToDB(data, collectionName)
}

jsonfile.readFile('./output/' + collection.aggregatedData + '.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.aggregatedData)
})

jsonfile.readFile('./output/' + collection.coursePerformance + '.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.coursePerformance)
})

jsonfile.readFile('./output/' + collection.enrolmentTrend + '.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.enrolmentTrend)
})

jsonfile.readFile('./output/' + collection.facultyDeptData + '.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.facultyDeptData)
})

jsonfile.readFile('./output/' + collection.overallInstructor + '.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.overallInstructor)
})

jsonfile.readFile('./output/' + collection.umiInstructor + '.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.umiInstructor)
})

jsonfile.readFile('./output/' + collection.metaData + '.json', (err, data) => {
  assert.equal(null, err)
  clearAndWrite(data, collection.metaData)
})
