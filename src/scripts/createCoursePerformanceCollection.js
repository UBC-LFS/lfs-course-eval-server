import R from 'ramda'
import jsonfile from 'jsonfile'
import assert from 'assert'

// currently faculty and dept averages are using the year's averages, not the terms. Maybe should change this to be terms later.
// const addDeptData = (instructorCourseRecords, deptData) =>
//   instructorCourseRecords.map(course => {
//     const deptFacultyRecord = R.find(deptRecord =>
//       R.keys(deptRecord).includes(course.year.toString()))(deptData)
//     course.facultyAverage = deptFacultyRecord[course.year].facultyAverage
//     course.deptAverage = deptFacultyRecord[course.year][course.dept + 'Average']
//     return course
//   }
// )

// const aggregateCP = (instructorData, deptFacultyData) =>
//   instructorData.map(instructor => ({
//     PUID: instructor.PUID,
//     Courses: addDeptData(instructor.Courses, deptFacultyData)
//   })
//   )

// need to refactor this to use the generated JSON, will be tricky because I need to enforce the order
// readDataByYear('2016', 'UMIInstructor', (res) => {
//   const UMIInstructorData = res
//   readDataByYear('2016', 'facultyDeptData', (res) => {
//     const result = aggregateCP(UMIInstructorData, res)
//     clearCollection('CoursePerformance')
//     writeToDB(result, 'CoursePerformance')
//   })
// })

const addDeptData = (courses, facultyDeptData) => {
  return courses.map(course => {
    const year = course.year
    const term = course.term
    const dept = course.dept

    const deptData = facultyDeptData
      .find(x => x.department === dept).data
      .find(x => x.year === year && x.term === term)

    course.deptAverage = deptData

    return course
  })
}

const addDeptAndFacultyAvgIntoUMIInstructorData = (UMIData, facultyDeptData) => {
  return UMIData.map(instructor => {
    return {
      PUID: instructor.PUID,
      Courses: addDeptData(instructor.Courses, facultyDeptData)
    }
  })
}

const outputCoursePerformance = () => {
  jsonfile.readFile('./output/UMIInstructorData.json', (err, UMIData) => {
    assert.equal(null, err)
    jsonfile.readFile('./output/facultyAndDeptData.json', (err, facultyDeptData) => {
      assert.equal(null, err)
      const result = addDeptAndFacultyAvgIntoUMIInstructorData(UMIData, facultyDeptData)
      const file = './output/coursePerformanceCollection.json'
      jsonfile.writeFile(file, result, (err) => assert.equal(err, null))
    })
  })
}

export {
  outputCoursePerformance
}
