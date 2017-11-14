import { readDataByYear, writeToDB, clearCollection } from '../service/dbService.js'
import R from 'ramda'

const sumEnrolment = (courseRecord) =>
  R.reduce((acc, record) => (acc + record.enrolment), 0, courseRecord.CourseSections)
const sumGender = (gen, courseRecord) =>
  R.reduce((acc, record) => (acc + record.gender[gen]), 0, courseRecord.CourseSections)

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
  const result = R.map(courseRecord => {
    const courses = courseRecord.CourseSections
    const byYearandTerm = R.groupBy(course => course.year + course.term)(courses)
    const pairedYearTermCourseData = Object.keys(byYearandTerm).map(key => {
      const YearTerm = key
      const CourseSections = byYearandTerm[key]
      return {
        YearTerm,
        CourseSections
      }
    })
    const groupedCourseObj = {}
    const aggregatedCourseObj = R.map(crecord => {
      const newObj = {
        enrolment: sumEnrolment(crecord),
        year: crecord.YearTerm
      }
      return newObj
    }, pairedYearTermCourseData)
    groupedCourseObj.Course = courseRecord.Course
    groupedCourseObj.Terms = aggregatedCourseObj
    return groupedCourseObj
  }, pairedCourseData)
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
