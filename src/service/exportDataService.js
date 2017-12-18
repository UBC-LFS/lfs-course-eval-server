import * as db from './dbService'
import * as collection from '../utils/constants'
import {
  umiAvg,
  expandCount,
  sumCount,
  toTwoDecimal
} from '../utils/calculate'
import { calculateEnrolment } from '../utils/aggregatedDataUtils'

const dataForOptions = () => {
  return new Promise((resolve, reject) => {
    db.readData(collection.metaData, {}, res => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}

const overviewStats = (year, data) => {
  const curYearSections = data.filter(section => section.year === Number(year))
  const prevYearSections = data.filter(section => section.year !== Number(year))

  const curUMI6Count = sumCount(curYearSections.map(section => section.UMI6.count))
  const prevUMI6Count = sumCount(prevYearSections.map(section => section.UMI6.count))
  return {
    currentYear: {
      umi6: umiAvg(curUMI6Count),
      enrolment: calculateEnrolment(curYearSections),
      responseRate: toTwoDecimal(expandCount(curUMI6Count).length / calculateEnrolment(curYearSections)),
      sections: curYearSections.length
    },
    previousYear: {
      umi6: umiAvg(prevUMI6Count),
      enrolment: calculateEnrolment(prevYearSections),
      responseRate: toTwoDecimal(expandCount(prevUMI6Count).length / calculateEnrolment(prevYearSections)),
      sections: prevYearSections.length
    }
  }
}

const dataForOverview = (year) => {
  const conditions = { $or: [{ year: Number(year) }, { year: Number(year - 1) }] }
  return new Promise((resolve, reject) => {
    db.readData(collection.aggregatedData, conditions, (data) => {
      if (data) resolve(overviewStats(year, data))
      else reject(Error('db returned no result'))
    })
  })
}

export {
  dataForOptions,
  dataForOverview
}
