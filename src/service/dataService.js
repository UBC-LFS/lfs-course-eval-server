import * as db from './dbService'

// const filterData = () => {
//   const createFilterObj = (data) => ({
//     years: get.uniqYears(data),
//     terms: get.uniqTerms(data),
//     courseLevels: get.uniqCourseLevels(data),
//     questionCodes: ['UMI1', 'UMI2', 'UMI3', 'UMI4', 'UMI5', 'UMI6'],
//     depts: get.uniqDepts(data)
//   })

//   return new Promise((resolve, reject) => {
//     readCSV('mockAggregatedData.csv', (data) => {
//       if (data) resolve(createFilterObj(data))
//       else reject(Error('the filter data was not created; no data exists'))
//     })
//   })
// }

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
    db.readDataByYear(year, '')
  })
}

export {
    dataForOverallInstructor,
    dataForUMIVSDispersion,
    dataForUMIInstructor,
    dataForCoursePerformance,
    dataForEnrolmentTrend
}
