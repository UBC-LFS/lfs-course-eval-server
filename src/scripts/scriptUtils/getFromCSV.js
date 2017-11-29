import R from 'ramda'

const getYear = ev => {
  const arr = ev.surveyname.split(' ')
  const length = ev.surveyname.split(' ').length
  return Number(arr[length - 1].slice(0, 4))
}

const getTerm = ev => {
  const arr = ev.surveyname.split(' ')
  const length = ev.surveyname.split(' ').length
  return arr[length - 1].slice(4, 6)
}

const getCourse = ev => {
  const courseNum = ev.crsnum
  return courseNum.split(' ').slice(0, courseNum.split(' ').length - 1).join(' ')
}

const getSection = ev => {
  const courseNum = ev.crsnum
  const arr = courseNum.split(' ')
  const length = arr.length
  return arr[length - 1]
}

const getCourseName = ev => ev.crsname

const getCourseLevel = ev => ev.crsyear

const getDept = ev => ev.deptname

const getInstructorName = ev => ev.resp_fac

const getPUID = ev => ev.eval_uname

const getUMI1 = ev => ev['The instructor made it clear what students were expected to learn.']
const getUMI2 = ev => ev['The instructor communicated the subject matter effectively.']
const getUMI3 = ev => ev['The instructor helped inspire interest in learning the subject matter.']
const getUMI4 = ev => ev['Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.']
const getUMI5 = ev => ev['The instructor showed concern for student learning.']
const getUMI6 = ev => ev['Overall  the instructor was an effective teacher.']

const getGender = ev => ev.gender

// for enrolment CSV
const getEnrolmentCourseNumber = crsnum => String(crsnum.split('.')[0])

const getEnrolmentSection = section => String(section).padStart(3, '0')

const getEnrolmentYear = period => Number(period.slice(0, 4))

const getEnrolmentTerm = period => String(period.slice(4, 6))

const getUniqYears = csv => R.uniq(csv.map(x => getYear(x)))

const getUniqTerms = csv => R.uniq(csv.map(x => getTerm(x)))

const getUniqDepts = csv => R.uniq(csv.map(x => getDept(x)))

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart (targetLength, padString) {
    targetLength = targetLength >> 0 // floor if number or convert non-number to 0;
    padString = String(padString || ' ')
    if (this.length > targetLength) {
      return String(this)
    } else {
      targetLength = targetLength - this.length
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length) // append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this)
    }
  }
}

export {
  getYear,
  getTerm,
  getCourse,
  getSection,
  getCourseName,
  getDept,
  getCourseLevel,
  getInstructorName,
  getPUID,
  getUMI1,
  getUMI2,
  getUMI3,
  getUMI4,
  getUMI5,
  getUMI6,
  getGender,
  getEnrolmentCourseNumber,
  getEnrolmentSection,
  getEnrolmentYear,
  getEnrolmentTerm,
  getUniqYears,
  getUniqTerms,
  getUniqDepts
}
