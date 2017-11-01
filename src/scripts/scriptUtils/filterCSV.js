import R from 'ramda'
import * as getFromCSV from './getFromCSV'

const byDept = (dept) => R.filter(x => x.deptname === dept)
const byYear = (year) => R.filter(x => getFromCSV.getYear(x) === year)

const invalidResults = R.filter(x => x === 1 || x === 2 || x === 3 || x === 4 || x === 5)

export {
  byDept,
  byYear,
  invalidResults
}
