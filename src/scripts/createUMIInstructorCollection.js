import { readDataByYear, writeToDB, clearCollection } from '../service/dbService.js'
import R from 'ramda'
import assert from 'assert'
import jsonfile from 'jsonfile'

const aggregateUMIInstructor = (data) => {
  const byInstructor = R.groupBy((course) => course.PUID)(data)
  return Object.keys(byInstructor).map(key => ({
    PUID: key,
    Courses: byInstructor[key]
  }))
}

const outputUMIInstructor = () => {
  readDataByYear('2016', 'aggregatedData', (res) => {
    const file = './output/UMIInstructorData.json'
    const result = aggregateUMIInstructor(res)
    jsonfile.writeFile(file, result, (err) => assert.equal(null, err))
  })
}

export {
  aggregateUMIInstructor,
  outputUMIInstructor
}
