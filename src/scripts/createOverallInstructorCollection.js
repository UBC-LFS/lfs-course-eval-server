import { readDataByYear, writeToDB, clearCollection } from '../service/dbService.js'
import R from 'ramda'
import * as calculate from '../utils/calculate'

const sumCount = (umi, val, instructorRecord) =>
  R.reduce((acc, record) => (acc + record[umi].count[val]), 0, instructorRecord[1])

const sumGender = (gen, instructorRecord) =>
  R.reduce((acc, record) => (acc + record.gender[gen]), 0, instructorRecord[1])

const sumEnrolment = (instructorRecord) =>
  R.reduce((acc, record) => (acc + record.enrolment), 0, instructorRecord[1])

const sumResponded = (instructorRecord) =>
  R.reduce((acc, record) => (acc + (record.responseRate * record.enrolment)), 0, instructorRecord[1])

const sumCourseCount = (instructorRecord) =>
  R.reduce((acc, record) => (acc + 1), 0, instructorRecord[1])

const concatenateDept = (instructorRecord) => {
  const deptList = []
  R.map(x => {
    if (!deptList.includes(x.dept)) { deptList.push(x.dept) }
  }, instructorRecord[1])
  return deptList
}

const aggregateOverallInstructor = (data) => {
  const byInstructor = R.groupBy((course) => course.PUID)

  const result = R.reduce((acc, instructorRecord) => {
    const classes = instructorRecord[1]
    const instructorObj = {
      instructorName: classes[0].instructorName,
      gender: {
        Female: sumGender('Female', instructorRecord),
        Male: sumGender('Male', instructorRecord)
      },
      numCoursesTaught: classes.length,
      numStudentsTaught: sumEnrolment(instructorRecord),
      responseRate: sumResponded(instructorRecord) / sumEnrolment(instructorRecord),
      dept: concatenateDept(instructorRecord).join(', ')
    }

    for (let i = 1; i <= 6; i++) {
      instructorObj['UMI' + i] = {
        count: {
          '1': sumCount('UMI' + i, '1', instructorRecord),
          '2': sumCount('UMI' + i, '2', instructorRecord),
          '3': sumCount('UMI' + i, '3', instructorRecord),
          '4': sumCount('UMI' + i, '4', instructorRecord),
          '5': sumCount('UMI' + i, '5', instructorRecord)
        }
      }
      instructorObj['UMI' + i]['dispersionIndex'] = calculate.dispersionIndex(instructorObj['UMI' + i].count)
      instructorObj['UMI' + i]['average'] = calculate.umiAvg(instructorObj['UMI' + i].count)
      instructorObj['UMI' + i]['percentFavourable'] = calculate.percentFavourable(instructorObj['UMI' + i].count)
    }
    acc.push(instructorObj)
    return acc
  }, [], R.toPairs(byInstructor(data)))
  return result
}

readDataByYear('2016', 'aggregatedData', (res) => {
  const result = aggregateOverallInstructor(res)
  clearCollection('OverallInstructor')
  writeToDB(result, 'OverallInstructor')
})

export {
  aggregateOverallInstructor
}
