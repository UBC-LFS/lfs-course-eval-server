import { readAggregatedDataByYear } from '../service/dbService.js'
import R from 'ramda'
import * as calculate from '../utils/calculate'

readAggregatedDataByYear('2016', (res) => {
  aggregateOverallInstructor(res)
})

const aggregateOverallInstructor = (data) => {
  const byInstructor = R.groupBy(function (course) {
    return course.PUID
  })

  const sumCount = (umi, val, tuple) => {
    const arr = R.reduce(function (acc, record) {
      return acc + record[umi].count[val]
    }, 0, tuple[1])
    return arr
  }

  const sumGender = (gen, tuple) => {
    const genArr = R.reduce(function (acc, record) {
      return acc + record.gender[gen]
    }, 0, tuple[1])
    return genArr
  }

  const sumEnrolment = (tuple) => {
    const enArr = R.reduce(function (acc, record) {
      return acc + record.enrolment
    }, 0, tuple[1])
    return enArr
  }

  const result = R.reduce(function (acc, tuple) {

    const instructorObj = {
      instructorName: tuple[1][0].instructorName,
      gender: {
        Female: sumGender('Female', tuple),
        Male: sumGender('Male', tuple)
      },
      enrolment: sumEnrolment(tuple)
    }

    for (let i = 1; i <= 6; i++) {
      instructorObj['UMI' + i] = {
        count:
        {
          '1': sumCount('UMI' + i, '1', tuple),
          '2': sumCount('UMI' + i, '2', tuple),
          '3': sumCount('UMI' + i, '3', tuple),
          '4': sumCount('UMI' + i, '4', tuple),
          '5': sumCount('UMI' + i, '5', tuple)
        }
      }
    }

    acc.push(
      instructorObj
    )
    return acc
  }, [], R.toPairs(byInstructor(data)))
  return result

  //TODO: add dispersionIndex, average, percentFavourable, responseRate
}

export {
  aggregateOverallInstructor
}
