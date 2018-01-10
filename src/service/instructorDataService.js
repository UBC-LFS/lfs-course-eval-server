import * as db from './dbService'
import { removeIDs } from '../utils/filter'
import * as collection from '../utils/constants'
import {
    umiAvg,
    sumCount,
    percentFavourable
} from '../utils/calculate'
import R from 'ramda'

<<<<<<< HEAD
const sumEnrolment = classes =>
    R.reduce((acc, record) => (acc + record.enrolment), 0, classes)

const dataForOverview = (instructor, year) => {
  const condition = {
    $and: [{ 'instructorName': instructor },
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
=======
const dataForOverview = instructor => {
  const condition = { 'instructorName': instructor }

  return new Promise((resolve, reject) => {
    db.readData(collection.overallInstructor, condition, data => {
      if (data) resolve(removeIDs(data))
>>>>>>> e3c6b58aebb76a7ccd8e164531536815bddda721
      else reject(Error('db returned no result'))
    })
  })
}

export {
    dataForOverview
}
