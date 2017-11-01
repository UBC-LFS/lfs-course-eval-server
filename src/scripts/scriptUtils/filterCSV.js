import R from 'ramda'
import * as getFromCSV from './getFromCSV'

const byDept = (dept) => R.filter(x => x.deptname === dept)
const byYear = (year) => R.filter(x => getFromCSV.getYear(x) === year)

const byUMI1 = R.map(x => getFromCSV.getUMI1(x))
const byUMI2 = R.map(x => getFromCSV.getUMI2(x))
const byUMI3 = R.map(x => getFromCSV.getUMI3(x))
const byUMI4 = R.map(x => getFromCSV.getUMI4(x))
const byUMI5 = R.map(x => getFromCSV.getUMI5(x))
const byUMI6 = R.map(x => getFromCSV.getUMI6(x))

const invalidResults = R.filter(x => x === 1 || x === 2 || x === 3 || x === 4 || x === 5)

export {
  byDept,
  byYear,
  byUMI1,
  byUMI2,
  byUMI3,
  byUMI4,
  byUMI5,
  byUMI6,
  invalidResults
}
