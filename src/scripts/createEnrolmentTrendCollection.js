import { readDataByYear, writeToDB, clearCollection } from '../service/dbService.js'
import R from 'ramda'

const sumEnrolment = (courseRecord) =>
    R.reduce((acc, record) => (acc + record.enrolment), 0, courseRecord[1])
const sumGender = (gen, courseRecord) =>
    R.reduce((acc, record) => (acc + record.gender[gen]), 0, courseRecord[1])

const aggregateEnrolmentByCourse = (data) => {
  const byCourse = R.groupBy(course => course.course)
  const result = R.map(courseRecord => {
    const courses = courseRecord[1]
    const byYearandTerm = R.groupBy(course => course.year + course.term)
    const groupedCourseObj = {}
    const aggregatedCourseObj = R.map(crecord => {
      const newObj = {
        enrolment: sumEnrolment(crecord),
        gender: {
          Female: sumGender('Female', crecord),
          Male: sumGender('Male', crecord)
        }
      }
      return { [crecord[0]]: newObj }
    },
            R.toPairs(byYearandTerm(courses)))
    groupedCourseObj[courseRecord[0]] = aggregatedCourseObj
    return groupedCourseObj
        //     const classes = courseRecord[1]
        //     const instructorObj = {
        //       instructorName: classes[0].instructorName,
        //
        //       numCoursesTaught: classes.length,
        //       numStudentsTaught: sumEnrolment(courseRecord),
        //       responseRate: sumResponded(courseRecord) / sumEnrolment(courseRecord),
        //       dept: concatenateDept(courseRecord).join(', ')
        //     }

        //     for (let i = 1; i <= 6; i++) {
        //       instructorObj['UMI' + i] = {
        //         count: {
        //           '1': sumCount('UMI' + i, '1', courseRecord),
        //           '2': sumCount('UMI' + i, '2', courseRecord),
        //           '3': sumCount('UMI' + i, '3', courseRecord),
        //           '4': sumCount('UMI' + i, '4', courseRecord),
        //           '5': sumCount('UMI' + i, '5', courseRecord)
        //         }
        //       }
        //       instructorObj['UMI' + i]['dispersionIndex'] = calculate.dispersionIndex(instructorObj['UMI' + i].count)
        //       instructorObj['UMI' + i]['average'] = calculate.umiAvg(instructorObj['UMI' + i].count)
        //       instructorObj['UMI' + i]['percentFavourable'] = calculate.percentFavourable(instructorObj['UMI' + i].count)
        //     }
        //     acc.push(instructorObj)
        //     return acc
  }, R.toPairs(byCourse(data)))
    //   return result
  console.log(JSON.stringify(result[1]))
}

readDataByYear('2016', 'aggregatedData', (res) => {
  const result = aggregateEnrolmentByCourse(res)
    // clearCollection('EnrolmentTrend')
    // writeToDB(result, 'EnrolmentTrend')
})

export {
    aggregateEnrolmentByCourse
}
