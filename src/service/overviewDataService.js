import * as db from './dbService'
import {
  umiAvg,
  expandCount,
  sumCount,
  toTwoDecimal
} from '../utils/calculate'
import { calculateEnrolment } from '../utils/aggregatedDataUtils'
import { removeIDs } from '../utils/filter'
import * as collection from '../utils/constants'

const dataForOverallInstructor = () => {
  return new Promise((resolve, reject) => {
    db.readData(collection.overallInstructor, {}, (res) => {
      if (res) resolve(removeIDs(res))
      else reject(Error('db returned no result'))
    })
  })
}

const dataForUMIInstructor = () => {
  return new Promise((resolve, reject) => {
    db.readData(collection.umiInstructor, {}, (res) => {
      if (res) resolve(removeIDs(res))
      else reject(Error('db returned no result'))
    })
  })
}
const dataForCoursePerformance = () => {
  return new Promise((resolve, reject) => {
    db.readData(collection.coursePerformance, {}, (res) => {
      if (res) resolve(removeIDs(res))
      else reject(Error('db returned no result'))
    })
  })
}

const dataForOptions = () => {
  return new Promise((resolve, reject) => {
    db.readData(collection.metaData, {}, res => {
      if (res) resolve(removeIDs(res))
      else reject(Error('db returned no result'))
    })
  })
}

const dataForUMIVSDispersion = ({ year, term, dept, meetsMin }) => {
  let conditions = { year: Number(year), term, dept, meetsMin: meetsMin === 'true' }
  if (term === 'all') delete conditions.term
  if (dept === 'all') delete conditions.dept
  if (meetsMin === 'false') delete conditions.meetsMin

  return new Promise((resolve, reject) => {
    db.readData(collection.aggregatedData, conditions, (res) => {
      if (res) resolve(removeIDs(res))
      else reject(Error('db returned no result'))
    })
  })
}

const dataForEnrolmentTrend = year => {
  return new Promise((resolve, reject) => {
    db.readData(collection.enrolmentTrend, {}, (res) => {
      if (res) resolve(removeIDs(res))
      else reject(Error('db returned no result'))
    })
  })
}

const dataForFaculyAndDept = year => {
  return new Promise((resolve, reject) => {
    db.readData(collection.facultyDeptData, {}, (res) => {
      if (res) resolve(removeIDs(res))
      else reject(Error('db returned no result'))
    })
  })
}

const dataForOverview = year => {
  const conditions = { $or: [{ year: Number(year) }, { year: Number(year - 1) }] }

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

  return new Promise((resolve, reject) => {
    db.readData(collection.aggregatedData, conditions, data => {
      if (data) resolve(overviewStats(year, removeIDs(data)))
      else reject(Error('db returned no result'))
    })
  })
}

export {
    dataForOverallInstructor,
    dataForUMIVSDispersion,
    dataForOptions,
    dataForUMIInstructor,
    dataForCoursePerformance,
    dataForEnrolmentTrend,
    dataForFaculyAndDept,
    dataForOverview
}
