import R from 'ramda'
import * as get from './get'

const byYear = (year) => R.filter(x => get.sliceYear(x.term) === year)
const byTerm = (term) => R.filter(term)
const byInstructor = (intructor) => R.filter(instructor)
const byDept = (dept) => R.filter(dept)

const byYearAndTerm = R.pipe(byYear, byTerm)

export {
    byYear,
    byTerm,
    byInstructor,
    byDept,
    byYearAndTerm
}