import * as db from './dbService'

const dataForOverallInstructor = (year) => {
  return new Promise((resolve, reject) => {
    db.readDataByYear(year, 'OverallInstructor', (res) => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}

const dataForUMIInstructor = (year) => {
  return new Promise((resolve, reject) => {
    db.readDataByYear(year, 'UMIInstructor', (res) => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}
const dataForCoursePerformance = (year) => {
  return new Promise((resolve, reject) => {
    db.readDataByYear(year, 'CoursePerformance', (res) => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}

const dataForUMIVSDispersion = (year) => {
  return new Promise((resolve, reject) => {
    db.readDataByYear(year, 'aggregatedData', (res) => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}

const dataForEnrolmentTrend = (year) => {
  return new Promise((resolve, reject) => {
    db.readDataByYear(year, 'EnrolmentTrend', (res) => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}

const dataForFaculyAndDept = (year) => {
  return new Promise((resolve, reject) => {
    db.readDataByYear(year, 'facultyDeptData', (res) => {
      if (res) resolve(res)
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
    dataForFaculyAndDept
}
