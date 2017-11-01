import * as filter from '../utils/filter'
import * as calculate from '../utils/calculate'
import * as get from '../utils/get'
import * as db from './dbService'
import readCSV from './readCSV'
import R from 'ramda'

const filterDataByFilterSettings = ({ chartKey, year, term, courseNum, department, toggleBelowMin, questionCode, classSizeMin, classSizeMax }, chartMapping) => {
  const filterPipeline = (data) => {
    let filteredData = R.pipe(
                filter.byYear(year),
                filter.byTerm(term),
                filter.byCourseNum(courseNum),
                filter.byDept(department),
                filter.byClassSize(classSizeMin, classSizeMax),
                filter.byToggleBelowMin(toggleBelowMin),
                filter.selectFields(questionCode, chartMapping['Fields'])
            )(data)
    if (chartKey === 'dashboard') {
      filteredData['AvgRating'] = calculate.questionAvg(data)
      filteredData['AvgClassSize'] = calculate.avgByField(data, 'classSize')
    }
    return filteredData
  }

  return new Promise((resolve, reject) => {
        // specify what file or eventually DB to connect to
    readCSV(chartMapping['DataSource'], (data) => {
      if (data) {
        resolve(filterPipeline(data))
      } else reject(Error('the data with the specified filter does not exist'))
    })
  })
}

const filterData = () => {
  const createFilterObj = (data) => ({
    years: get.uniqYears(data),
    terms: get.uniqTerms(data),
    courseLevels: get.uniqCourseLevels(data),
    questionCodes: ['UMI1', 'UMI2', 'UMI3', 'UMI4', 'UMI5', 'UMI6'],
    depts: get.uniqDepts(data)
  })

  return new Promise((resolve, reject) => {
    readCSV('mockAggregatedData.csv', (data) => {
      if (data) resolve(createFilterObj(data))
      else reject(Error('the filter data was not created; no data exists'))
    })
  })
}

const dataForOverallInstructor = () => {

}

const dataForUMIInstructor = () => {

}
const dataForCoursePerformance = () => {

}

const dataForUMIVSDispersion = (year) => {
  return new Promise((resolve, reject) => {
    db.readDataByYear(year, 'aggregatedData', (res) => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}

export {
    filterDataByFilterSettings,
    filterData,
    dataForOverallInstructor,
    dataForUMIVSDispersion,
    dataForUMIInstructor,
    dataForCoursePerformance
}
