import * as db from './dbService'
import {
  umiAvg,
  expandCount,
  standardDeviation,
  sumCount,
  percentFavourable,
  dispersionIndex,
  toTwoDecimal
} from '../utils/calculate'
import { calculateEnrolment } from '../utils/aggregatedDataUtils'
import * as collection from '../utils/constants'
import R from 'ramda'

const dataForOverallInstructor = year => {
  return new Promise((resolve, reject) => {
    db.readData(collection.overallInstructor, {}, (res) => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}

const dataForUMIInstructor = year => {
  return new Promise((resolve, reject) => {
    db.readData(collection.umiInstructor, {}, (res) => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}
const dataForCoursePerformance = year => {
  return new Promise((resolve, reject) => {
    db.readData(collection.coursePerformance, {}, (res) => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}

const dataForUMIVSDispersion = year => {
  return new Promise((resolve, reject) => {
    db.readData(collection.aggregatedData, {}, (res) => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}

const dataForEnrolmentTrend = year => {
  return new Promise((resolve, reject) => {
    db.readData(collection.enrolmentTrend, {}, (res) => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}

const dataForFaculyAndDept = year => {
  return new Promise((resolve, reject) => {
    db.readData(collection.facultyDeptData, {}, (res) => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}

const analyzeAggregatedData = data => {
  const UMI6Count = sumCount(data.map(section => section.UMI6.count))
  return {
    standardDeviation: standardDeviation(expandCount(UMI6Count)),
    percentFavourable: percentFavourable(UMI6Count),
    dispersionIndex: dispersionIndex(UMI6Count),
    average: umiAvg(UMI6Count),
    length: data.length
  }
}

const dataForStats = (fromYear, toYear, dept) => {
  const conditions = { year: { $gte: Number(fromYear), $lte: Number(toYear) }, dept: dept }
  return new Promise((resolve, reject) => {
    db.readData(collection.aggregatedData, conditions, (data) => {
      if (data) resolve(analyzeAggregatedData(data))
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
    dataForOverallInstructor,
    dataForUMIVSDispersion,
    dataForUMIInstructor,
    dataForCoursePerformance,
    dataForEnrolmentTrend,
    dataForFaculyAndDept,
    dataForStats,
    dataForOverview
}
