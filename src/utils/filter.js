import R from 'ramda'
import * as get from './get'

const byYear = (year) => R.filter(x => Number(get.sliceYear(x.term)) === Number(year))
const byTerm = (term) => R.filter(x => String(get.sliceTerm(x.term)) === String(term))
const byInstructor = (instructorID) => R.filter(x => String(x.id) === String(instructorID))
const byDept = (dept) => R.filter(x => String(x.deptName) === String(dept))
const byCourseNum = (courseNum) => R.filter(x => String(x.courseNum) === String(courseNum))
const bySpecificCourse = (courseNum, year, term) => R.filter(x => String(x.courseNum) === String(courseNum) && String(x.term) === String(year + term))
const byYearAndTerm = (year, term) => R.pipe(byYear(year), byTerm(term))
const byClassSize = (min, max) => R.pipe(byMinClassSize(min), byMaxClassSize(max))
const byMinClassSize = (size) => R.filter(x => Number(x.classSize) >= Number(size))
const byMaxClassSize = (size) => R.filter(x => Number(x.classSize) <= Number(size))
const byToggleBelowMin = (toggleBelowMin) => R.filter(x => {
    if (toggleBelowMin == 'true') return true
    else return x.meetsMin === 1
})
const selectFields = (questionCode, fieldArray) => R.map(x => {
    const cleanedObj = {}
    for (let i = 0; i < fieldArray.length; i++) {
        let field = fieldArray[i]
        let resultField = field
        if (field === "Avg" || field === "Dispersion" || field === "PercentFavourable") { resultField = questionCode + field }
        if (x.hasOwnProperty(resultField)) cleanedObj[field] = x[resultField]
    }
    cleanedObj["questionCode"] = questionCode
    return cleanedObj
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
    byToggleBelowMin,
    selectFields
}