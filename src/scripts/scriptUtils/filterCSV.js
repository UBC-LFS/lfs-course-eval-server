import R from 'ramda'
import * as getFromCSV from './getFromCSV'

const byYear = (year) => R.filter(x => getFromCSV.getYear(x) === year)
const byTerm = (term) => R.filter(x => getFromCSV.getTerm(x) === term)
const byDept = (dept) => R.filter(x => x.deptname === dept)

const invalidResults = R.filter(x => x === 1 || x === 2 || x === 3 || x === 4 || x === 5)

const byUMI1 = (csv) => invalidResults(R.map(x => getFromCSV.getUMI1(x), csv))
const byUMI2 = (csv) => invalidResults(R.map(x => getFromCSV.getUMI2(x), csv))
const byUMI3 = (csv) => invalidResults(R.map(x => getFromCSV.getUMI3(x), csv))
const byUMI4 = (csv) => invalidResults(R.map(x => getFromCSV.getUMI4(x), csv))
const byUMI5 = (csv) => invalidResults(R.map(x => getFromCSV.getUMI5(x), csv))
const byUMI6 = (csv) => invalidResults(R.map(x => getFromCSV.getUMI6(x), csv))

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
