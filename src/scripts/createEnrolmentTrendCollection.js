import { readDataByYear, writeToDB, clearCollection } from '../service/dbService.js'
import R from 'ramda'

const sumEnrolment = (courseRecord) =>
  R.reduce((acc, record) => (acc + record.enrolment), 0, courseRecord.CourseSections)

const aggregateEnrolmentByCourse = (data) => {
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

readDataByYear('2016', 'aggregatedData', (res) => {
  const result = aggregateEnrolmentByCourse(res)
  clearCollection('EnrolmentTrend')
  writeToDB(result, 'EnrolmentTrend')
})

export {
  aggregateEnrolmentByCourse
}
