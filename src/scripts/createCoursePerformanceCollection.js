import jsonfile from 'jsonfile'
import assert from 'assert'

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
  UMIData.map(instructor => {
    return {
      PUID: instructor.PUID,
      Courses: addDeptData(instructor.Courses, facultyDeptData)
    }
  }
)

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
  addDeptData,
  addDeptAndFacultyAvgIntoUMIInstructorData,
  outputCoursePerformance
}
