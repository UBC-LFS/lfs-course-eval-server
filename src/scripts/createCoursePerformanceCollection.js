import { readDataByYear, writeToDB, clearCollection } from '../service/dbService.js'
import R from 'ramda'

// *TODO* refactor this
const addDeptData = (instructorCourseRecords, deptData) =>
  instructorCourseRecords.map(course => {
    const deptFacultyRecord = R.find(deptRecord =>
      R.keys(deptRecord).includes(course.year.toString()))(deptData)
    course.facultyAverage = deptFacultyRecord[course.year].facultyAverage
    course.deptAverage = deptFacultyRecord[course.year][course.dept + 'Average']
    return course
  })

const aggregateCP = (instructorData, deptFacultyData) =>
  instructorData.map(instructor => ({
    PUID: instructor.PUID,
    Courses: addDeptData(instructor.Courses, deptFacultyData)
  }))

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
