import R from 'ramda'
import * as get from './get'

const byYear = (year) => R.filter(x => get.sliceYear(x.term) === year)
const byTerm = (term) => R.filter(x => get.sliceTerm(x.term) === term)
const byInstructor = (instructor) => R.filter(x => x.instructor === instructor)
const byDept = (dept) => R.filter(x => x.deptName === dept)

const byYearAndTerm = (year, term) => R.pipe(byYear(year), byTerm(term))

export {
    byYear,
    byTerm,
    byInstructor,
    byDept,
    byYearAndTerm
}