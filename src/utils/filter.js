import R from 'ramda'
import * as get from './get'

const byYear = (year) => R.filter(x => get.sliceYear(x.term) === year)
const byTerm = (term) => R.filter(x => get.sliceTerm(x.term) === term)
const byInstructor = (instructorID) => R.filter(x => x.id === instructorID)
const byDept = (dept) => R.filter(x => x.deptName === dept)
const byCourseNum = (courseNum) => R.filter(x => x.courseNum === courseNum)
const bySpecificCourse = (courseNum, year, term) => R.filter(x => x.courseNum === courseNum && x.term === year + term)
const byYearAndTerm = (year, term) => R.pipe(byYear(year), byTerm(term))
//TODO: test these functions!
const byClassSize = (min, max) => R.pipe(byMinClassSize(min), byMaxClassSize(max))
const byMinClassSize = (size) => R.filter(x => x.classSize >= size)
const byMaxClassSize = (size) => R.filter(x => x.classSize <= size)
const byToggle = (removeBelowMin) => R.filter(x => {
    if (!removeBelowMin) return true
    else return x.meetsMin === 1
})
export {
    byYear,
    byTerm,
    byInstructor,
    byDept,
    byCourseNum,
    byYearAndTerm,
    bySpecificCourse,
    byClassSize,
    byToggle
}