import { readDataByYear, writeToDB, clearCollection } from '../service/dbService.js'
import R from 'ramda'

const aggregateUMIInstructor = (data) => {
  const byInstructor = R.groupBy((course) => course.PUID)(data)
  return Object.keys(byInstructor).map(key => {
    const PUID = key
    const Courses = byInstructor[key]
    return {
      PUID,
      Courses
    }
  })
}

readDataByYear('2016', 'aggregatedData', (res) => {
  const result = aggregateUMIInstructor(res)
  clearCollection('UMIInstructor')
  writeToDB(result, 'UMIInstructor')
})

export {
    aggregateUMIInstructor
}
