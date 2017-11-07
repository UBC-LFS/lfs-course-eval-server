import { readDataByYear, writeToDB, clearCollection } from '../service/dbService.js'
import R from 'ramda'

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

const aggregateCP = (instructorData, deptFacultyData) => {
  const finalArray = R.map(x => {
    const instructorObj = {}
    instructorObj.PUID = x.PUID
    instructorObj.Courses = addDeptData(x.Courses, deptFacultyData)
    return instructorObj
  }, instructorData)
  return finalArray
}

readDataByYear('2016', 'UMIInstructor', (res) => {
  const UMIInstructorData = res
  readDataByYear('2016', 'facultyDeptData', (res) => {
    const result = aggregateCP(UMIInstructorData, res)
    clearCollection('CoursePerformance')    
    writeToDB(result, 'CoursePerformance')
  })
})

export {
    aggregateCP,
    addDeptData
}
