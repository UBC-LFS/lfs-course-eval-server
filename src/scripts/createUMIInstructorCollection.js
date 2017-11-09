import { readDataByYear, writeToDB, clearCollection } from '../service/dbService.js'
import R from 'ramda'

const aggregateUMIInstructor = (data) => {
  const byInstructor = R.groupBy((course) => course.PUID)
  const result = R.toPairs(byInstructor(data))
  return result.map(course => {
    const PUID = course[0]
    const Courses = course[1]
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
