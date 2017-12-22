import jsonfile from 'jsonfile'
import assert from 'assert'
import * as collection from '../utils/constants'

const addDeptData = (courses, facultyDeptData) =>
  courses.map(course => {
    const year = course.year
    const term = course.term
    const dept = course.dept

    course.deptAverage = facultyDeptData
      .find(x => x.department === dept).data
      .find(x => x.year === year && x.term === term)

    return course
  }
)

const addDeptAndFacultyAvgIntoUMIInstructorData = (UMIData, facultyDeptData) =>
  UMIData.map(instructor => ({
    PUID: instructor.PUID,
    Courses: addDeptData(instructor.Courses, facultyDeptData)
  })
)

const outputCoursePerformance = cb => {
  jsonfile.readFile('./output/' + collection.umiInstructor + '.json', (err, UMIData) => {
    assert.equal(null, err)
    jsonfile.readFile('./output/' + collection.facultyDeptData + '.json', (err, facultyDeptData) => {
      assert.equal(null, err)
      const result = addDeptAndFacultyAvgIntoUMIInstructorData(UMIData, facultyDeptData)
      const file = './output/' + collection.coursePerformance + '.json'
      jsonfile.writeFile(file, result, err => assert.equal(err, null))
      cb()
    })
  })
}

export {
  addDeptData,
  addDeptAndFacultyAvgIntoUMIInstructorData,
  outputCoursePerformance
}
