import R from 'ramda'
import readCSV from '../service/readCSV'
import * as getFromCSV from './scriptUtils/getFromCSV'
import assert from 'assert'

const checkCourseCodeAndDeptMatch = csv =>
  csv.filter(ev => R.not(getFromCSV.getDeptFromCourseNum(ev).includes(getFromCSV.getDept(ev))))

const checkDept = csv => {
  const dept = ['APBI', 'ECON', 'FNH', 'FOOD', 'FRE', 'GRS', 'HUNU', 'LFS', 'PLNT', 'RMES', 'SOIL']
  return csv.filter(ev => !dept.includes(ev.deptname)).map(ev => ev.deptname)
}

readCSV('../scripts/source/rawDataAll.csv', csv => {
  const courseCodeDeptMatch = checkCourseCodeAndDeptMatch(csv)
  if (courseCodeDeptMatch.length > 0) {
    console.log('The course numbers and the departments of the following courses do not match', courseCodeDeptMatch.map(x => [x.crsnum, x.deptname]))
  }
  const depts = checkDept(csv)
  if (checkDept.length > 0) {
    console.log('There are unexpected Depts included in the CSV', depts)
  }
})

// const errorCheck = courseObjs => {
//   // check to make sure enrolments are all there:
//   const courseObjMissingEnrolment = courseObjs.filter(course => !course.hasOwnProperty('enrolment'))
//   if (courseObjMissingEnrolment.length !== 0) {
//     console.log(courseObjMissingEnrolment)
//     throw new Error('Some courses are missing enrolment data')
//   }

//   const courseObjWithFalsyValues = courseObjs.filter(course => {
//     if (!course.year && !course.term && !course.section && !course.courseName && !course.courseLevel && !course.dept && !course.instructorName && !course.PUID) return true
//     else return false
//   })
//   if (courseObjWithFalsyValues.length !== 0) {
//     console.log(courseObjWithFalsyValues)
//     throw new Error('Some courses have null values')
//   }

//   const courseObjWithFalsyUMIValues = []
//   for (let i = 1; i <= 6; i++) {
//     let UMI = 'UMI' + i
//     courseObjWithFalsyUMIValues.push(courseObjs.filter(course => {
//       if (!course[UMI].dispersionIndex && course[UMI].dispersionIndex !== 0) return true
//       if (!course[UMI].average && course[UMI].average !== 0) return true
//       if (!course[UMI].percentFavourable && course[UMI].percentFavourable !== 0) return true
//       if (!course[UMI].percentileRankingByFaculty && course[UMI].percentileRankingByFaculty !== 0) return true
//       if (!course[UMI].percentileRankingByDept && course[UMI].percentileRankingByDept !== 0) return true
//       else return false
//     }))
//   }
//   if (R.flatten(courseObjWithFalsyUMIValues).length !== 0) {
//     // console.log(JSON.stringify(courseObjWithFalsyUMIValues, null, 2))
//     // throw new Error('Some courses have UMI values that are invalid (dispersionIndex, average, etc)')
//   }
//   return true
// }
