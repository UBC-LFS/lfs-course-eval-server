import * as db from './dbService'
import { removeIDs } from '../utils/filter'
import * as collection from '../utils/constants'
import {
  umiAvg,
  sumCount,
  percentFavourable
} from '../utils/calculate'
import R from 'ramda'

const sumEnrolment = classes =>
  R.reduce((acc, record) => (acc + record.enrolment), 0, classes)

const dataForOverview = (puid, year) => {
  const condition = {
    $and: [{ 'PUID': puid },
      { $or: [{ year: Number(year) }, { year: Number(year - 1) }] }]
  }

  const overviewStats = (year, data) => {
    const curYearSections = data.filter(section => section.year === Number(year))
    const prevYearSections = data.filter(section => section.year !== Number(year))

    const curUMI6Count = sumCount(curYearSections.map(section => section.UMI6.count))
    const prevUMI6Count = sumCount(prevYearSections.map(section => section.UMI6.count))
    return {
      currentYear: {
        umi6: umiAvg(curUMI6Count),
        percentFavourable: percentFavourable(curUMI6Count),
        numCoursesTaught: curYearSections.length,
        numStudentsTaught: sumEnrolment(curYearSections)

      },
      previousYear: {
        umi6: umiAvg(prevUMI6Count),
        percentFavourable: percentFavourable(prevUMI6Count),
        numCoursesTaught: prevYearSections.length,
        numStudentsTaught: sumEnrolment(prevYearSections)
      }
    }
  }
  return new Promise((resolve, reject) => {
    db.readData(collection.aggregatedData, condition, data => {
      if (data) resolve(overviewStats(year, removeIDs(data)))
      else reject(Error('db returned no result'))
    })
  })
}

const dataForInstructorRanking = ({ year, minClassSize, maxClassSize }) => {
  let conditions = { year: Number(year), $and: [{'enrolment': {$gte: Number(minClassSize)} }, {'enrolment': {$lte: Number(maxClassSize)} }] }
  return new Promise((resolve, reject) => {
    db.readData(collection.aggregatedData, conditions, (res) => {
      if (res) resolve(removeIDs(res))
      else reject(Error('db returned no result'))
    })
  })
}

export {
  dataForOverview,
  dataForInstructorRanking
}
