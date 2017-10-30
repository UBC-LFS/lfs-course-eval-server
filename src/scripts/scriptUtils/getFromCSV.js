const getYear = (ev) => {
  const split = ev.surveyname.split('')
  let result
  split.map((char, i) => {
    if (!isNaN(char)) {
      if (!isNaN(split[i + 2]) && !isNaN(split[i + 3]) && !isNaN(split[i + 4])) {
        result = Number(split[i + 1] + split[i + 2] + split[i + 3] + split[i + 4])
      }
    }
  })
  return result
}

const getTerm = (ev) => {
  const split = ev.surveyname.split('')
  let result
  split.map((char, i) => {
    if (!isNaN(char)) {
      if (!isNaN(split[i + 2]) && !isNaN(split[i + 3]) && !isNaN(split[i + 4])) {
        result = String(split[i + 5] + split[i + 6])
      }
    }
  })
  return result
}

const getCourse = (ev) => {
  const courseNum = ev.crsnum
  return courseNum.split(' ').slice(0, courseNum.split(' ').length - 1).join(' ')
}

const getSection = (ev) => {
  const courseNum = ev.crsnum
  const arr = courseNum.split(' ')
  const length = arr.length
  return arr[length - 1]
}

const getCourseName = (ev) => ev.crsname

const getCourseLevel = (ev) => ev.crsyear

const getDept = (ev) => ev.deptname

const getInstructorName = (ev) => ev.resp_fac
const getPUID = (ev) => ev.eval_uname

const getUMI1 = (ev) => ev['The instructor made it clear what students were expected to learn.']
const getUMI2 = (ev) => ev['The instructor communicated the subject matter effectively.']
const getUMI3 = (ev) => ev['The instructor helped inspire interest in learning the subject matter.']
const getUMI4 = (ev) => ev['Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.']
const getUMI5 = (ev) => ev['The instructor showed concern for student learning.']
const getUMI6 = (ev) => ev['Overall  the instructor was an effective teacher.']

const getGender = (ev) => ev.gender

// for enrolment CSV
const getEnrolmentCourseNumber = (crsnum) => String(crsnum.split('.')[0])

const getEnrolmentSection = (section) => String(section).padStart(3, '0')

const getEnrolmentYear = (period) => Number(period.slice(0, 4))

const getEnrolmentTerm = (period) => String(period.slice(4, 6))

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
    getEnrolmentTerm
}
