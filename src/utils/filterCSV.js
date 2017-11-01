import R from 'ramda'

const byDept = (dept) => R.filter(x => x.deptname === dept)

const invalidResults = R.filter(x => x === 1 || x === 2 || x === 3 || x === 4 || x === 5)

export {
  byDept,
  invalidResults
}
