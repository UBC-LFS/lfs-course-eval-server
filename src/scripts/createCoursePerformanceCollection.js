import { readDataByYear, writeToDB } from '../service/dbService.js'
import R from 'ramda'

readDataByYear('2016', 'UMIInstructor', (res) => {
  const UMIInstructorData = res
  readDataByYear('2016', 'facultyDeptData', (res) => {
    const result = aggregateCP(UMIInstructorData, res)
    writeToDB(result, 'CoursePerformance')
  })
})

const addDeptData = (instructorCourseRecords, deptData) => {
  return R.map(z => {
    const deptFacultyRecord = R.find(y => {
      return R.keys(y).includes(z.year.toString())
    })(deptData)
    z['facultyAverage'] = deptFacultyRecord[z.year].facultyAverage
    z['deptAverage'] = deptFacultyRecord[z.year][z.dept + 'Average']
    return z
  }, instructorCourseRecords)
}

const retrievePUID = (instructorRecord) => {
  const keys = Object.keys(instructorRecord)
  let instructorPUID = ''
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== '_id') {
      instructorPUID = keys[i]
      break
    }
  }
  return instructorPUID
}
const aggregateCP = (instructorData, deptFacultyData) => {
  const finalArray = R.map(x => {
    const instructorObj = {}
    const instructorPUID = retrievePUID(x)
    instructorObj[instructorPUID] = addDeptData(x[instructorPUID], deptFacultyData)
    return instructorObj
  }, instructorData)
  return finalArray
}

export {
    aggregateCP,
    addDeptData,
    retrievePUID
}
