import R from 'ramda'
import * as getFromCSV from './getFromCSV'

const byYear = (year) => R.filter(x => getFromCSV.getYear(x) === year)
const byTerm = (term) => R.filter(x => getFromCSV.getTerm(x) === term)
const byDept = (dept) => R.filter(x => x.deptname === dept)

const invalidResults = R.filter(x => x === 1 || x === 2 || x === 3 || x === 4 || x === 5)

const byUMI1 = (csv) => invalidResults(csv.map(x => getFromCSV.getUMI1(x)))
const byUMI2 = (csv) => invalidResults(csv.map(x => getFromCSV.getUMI2(x)))
const byUMI3 = (csv) => invalidResults(csv.map(x => getFromCSV.getUMI3(x)))
const byUMI4 = (csv) => invalidResults(csv.map(x => getFromCSV.getUMI4(x)))
const byUMI5 = (csv) => invalidResults(csv.map(x => getFromCSV.getUMI5(x)))
const byUMI6 = (csv) => invalidResults(csv.map(x => getFromCSV.getUMI6(x)))

export {
  byDept,
  byYear,
  byTerm,
  byUMI1,
  byUMI2,
  byUMI3,
  byUMI4,
  byUMI5,
  byUMI6,
  invalidResults
}
  