import assert from 'assert'
import jsonfile from 'jsonfile'
import R from 'ramda'

const sumEnrolment = courseRecord =>
  R.reduce((acc, record) => (acc + record.enrolment), 0, courseRecord.CourseSections)

const aggregateEnrolmentByCourse = data => {
  const byCourse = R.groupBy(course => course.course)(data)
  const pairedCourseData = Object.keys(byCourse).map(key => {
    const Course = key
    const CourseSections = byCourse[key]
    return {
      Course,
      CourseSections
    }
  })
  const result = pairedCourseData.map(courseRecord => {
    const courses = courseRecord.CourseSections
    const byYearandTerm = R.groupBy(course => course.year + course.term)(courses)

    const pairedYearTermCourseData = Object.keys(byYearandTerm).map(key => ({
      YearTerm: key,
      CourseSections: byYearandTerm[key]
    }))

    const aggregatedCourseObj = pairedYearTermCourseData.map(crecord => ({
      enrolment: sumEnrolment(crecord),
      year: crecord.YearTerm
    }))

    return {
      Course: courseRecord.Course,
      Terms: aggregatedCourseObj
    }
  })
  return result
}

const outputEnrolmentTrendData = () => {
  jsonfile.readFile('./output/aggregatedData.json', (err, json) => {
    assert.equal(null, err)
    const result = aggregateEnrolmentByCourse(json)
    const file = './output/enrolmentTrendData.json'
    jsonfile.writeFile(file, result, (err) => assert.equal(err, null))
  })
}

export {
  aggregateEnrolmentByCourse,
  outputEnrolmentTrendData
}
