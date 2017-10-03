import R from 'ramda'
import * as get from './get'
import * as filter from './filter'

const toTwoDecimal = (decimal) => Math.round(decimal * 100) / 100
// TODO: write more tests
const questionAvg = (arr) => {
  const sumOfRatings = R.reduce((total, x) => total + (x.percentResponses * x.classSize * x.Avg), 0)(arr)
  const sumOfClassSize = R.reduce((sum, x) => sum + (x.percentResponses * x.classSize), 0)(arr)
  return parseFloat(sumOfRatings / sumOfClassSize).toFixed(2)
}

const avgByField = (arr, field) => {
  let fieldArray = R.map(x => x[field], arr)
  return parseFloat(R.mean(fieldArray)).toFixed(1)
}

// all inputs below take an array of objects as the last argument
const avg = (arr) => R.mean(arr)

const median = (arr) => R.median(arr)

const percentGender = (gender, arr) => {
  const countOfSpecifiedGender = arr.filter(x => x.gender === gender).length
  return countOfSpecifiedGender / arr.length
}

const percentileRankingOfCourse = (course, umi, allCoursesSortedByUMI) => {
  const averageOfCourse = course[umi].average

  const numberOfCoursesBelowUMIAverageofCourse = allCoursesSortedByUMI.filter(x => x[umi].average < averageOfCourse).length

  const numberOfCoursesWithExactlyTheSameUMIAverageOfCourse = allCoursesSortedByUMI.filter(x => x[umi].average === averageOfCourse).length

  const result = R.divide(
        R.add(numberOfCoursesBelowUMIAverageofCourse,
            R.multiply(0.5, numberOfCoursesWithExactlyTheSameUMIAverageOfCourse))
        , allCoursesSortedByUMI.length)

  if (result < 0.01) return 0.01
  if (result > 0.99) return 0.99
  else return toTwoDecimal(result)
}

const umiAvgOfCourse = (courseNum, year, term, umi, arr) =>
    R.pipe(
        filter.bySpecificCourse(courseNum, year, term),
        get.arrayOfUMI(umi),
        x => avg(x)
    )(arr)

const umiAvgOfInstructor = (instructorID, umi, arr) =>
    R.pipe(
        filter.byInstructor(instructorID),
        get.arrayOfUMI(umi),
        x => avg(x)
    )(arr)

const dispersionIndex = (count) => {
    // this 'fills in' any missing scores with 0
  for (let i = 1; i <= 5; i++) {
    const key = String(i)
    if (!count.hasOwnProperty(key)) count[key] = 0
  }
  const numberOfResponses = Object.keys(count).reduce((acc, curKey) => (acc += count[curKey]), 0)

  const dispersionObj = {}

  for (let i = 1; i <= 5; i++) {
    const key = String(i)
    const prevKey = String(i - 1)
    dispersionObj[key] = {
      count: count[key],
      proportion: count[key] / numberOfResponses
    }
    if (i === 1) dispersionObj[key].cumulativeProp = dispersionObj[key].proportion
    else dispersionObj[key].cumulativeProp = dispersionObj[prevKey].cumulativeProp + dispersionObj[key].proportion
    dispersionObj[key].oneMinusF = 1 - dispersionObj[key].cumulativeProp
    dispersionObj[key].finalF = dispersionObj[key].cumulativeProp * dispersionObj[key].oneMinusF
  }

  return toTwoDecimal(Object.keys(dispersionObj).reduce((acc, key) => (acc += dispersionObj[key].finalF), 0))
}

const umiAvg = (count) => {
  for (let i = 1; i <= 5; i++) {
    const key = String(i)
    if (!count.hasOwnProperty(key)) count[key] = 0
  }
  const numberOfResponses = Object.keys(count).reduce((acc, curKey) => (acc += count[curKey]), 0)

  return toTwoDecimal(Object.keys(count).reduce((acc, key) => (acc += count[key] * Number(key)), 0) / numberOfResponses)
}

const percentFavourable = (count) => {
  for (let i = 1; i <= 5; i++) {
    const key = String(i)
    if (!count.hasOwnProperty(key)) count[key] = 0
  }
  const numberOfResponses = Object.keys(count).reduce((acc, curKey) => (acc += count[curKey]), 0)
  const numberOf4and5 = R.add(R.prop('4', count), R.prop('5', count))

  return numberOf4and5 / numberOfResponses
}

export {
    avg,
    median,
    percentGender,
    toTwoDecimal,
    dispersionIndex,
    umiAvgOfInstructor,
    umiAvgOfCourse,
    questionAvg,
    avgByField,
    umiAvg,
    percentFavourable,
    percentileRankingOfCourse
}
