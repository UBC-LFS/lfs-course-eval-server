import fs from 'fs'
import parse from 'csv-parse'
import * as calculate from '../utils/calculate'
import * as getFromCSV from './scriptUtils/getFromCSV'
import R from 'ramda'
import path from 'path'
import { writeToDB } from '../service/dbService'

const readCSV = (filename, callback) => {
  const parser = parse({ delimiter: ',', columns: true, relax: true, auto_parse: true }, (
    err, data) => {
    if (err) throw err
    callback(data)
  })
  fs.createReadStream(path.join(__dirname, '/source/', filename)).pipe(parser)
}

const getProperties = (ev) => ({
  year: getFromCSV.getYear(ev),
  term: getFromCSV.getTerm(ev),
  course: getFromCSV.getCourse(ev),
  section: getFromCSV.getSection(ev),
  courseName: getFromCSV.getCourseName(ev),
  courseLevel: getFromCSV.getCourseLevel(ev),
  dept: getFromCSV.getDept(ev),
  instructorName: getFromCSV.getInstructorName(ev),
  PUID: getFromCSV.getPUID(ev),
  gender: getFromCSV.getGender(ev)
})

const createCourseObj = (csv) => {
  return csv.reduce((acc, ev) => {
    const { year, term, course, section, courseName, courseLevel, dept, instructorName, PUID, gender } = getProperties(ev)

    const uniqSectionInTerm = (x) => (x.year === year &&
      x.course === course &&
      x.term === term &&
      x.section === section &&
      x.instructorName === instructorName)

    if (acc.some(x => uniqSectionInTerm(x))) {
      const index = acc.findIndex(x => uniqSectionInTerm(x))
      for (let i = 1; i <= 6; i++) {
        let getUMI
        let UMI = 'UMI' + i
        switch (i) {
          case 1:
            getUMI = getFromCSV.getUMI1(ev)
            break
          case 2:
            getUMI = getFromCSV.getUMI2(ev)
            break
          case 3:
            getUMI = getFromCSV.getUMI3(ev)
            break
          case 4:
            getUMI = getFromCSV.getUMI4(ev)
            break
          case 5:
            getUMI = getFromCSV.getUMI5(ev)
            break
          case 6:
            getUMI = getFromCSV.getUMI6(ev)
            break
        }
        if (typeof (acc[index][UMI].count[getUMI]) === 'undefined') {
          acc[index][UMI].count = { ...acc[index][UMI].count, [getUMI]: 1 }
        } else acc[index][UMI].count[getUMI] = acc[index][UMI].count[getUMI] + 1
      }
      acc[index].gender[gender] = acc[index].gender[gender] + 1
      return acc
    } else {
      acc.push({
        year,
        term,
        course,
        section,
        courseName,
        courseLevel,
        dept,
        instructorName,
        PUID,
        gender: {
          Female: (gender === 'Female') ? 1 : 0,
          Male: (gender === 'Male') ? 1 : 0
        },
        UMI1: {
          count: {
            [String(getFromCSV.getUMI1(ev))]: 1
          }
        },
        UMI2: {
          count: {
            [String(getFromCSV.getUMI2(ev))]: 1
          }
        },
        UMI3: {
          count: {
            [String(getFromCSV.getUMI3(ev))]: 1
          }
        },
        UMI4: {
          count: {
            [String(getFromCSV.getUMI4(ev))]: 1
          }
        },
        UMI5: {
          count: {
            [String(getFromCSV.getUMI5(ev))]: 1
          }
        },
        UMI6: {
          count: {
            [String(getFromCSV.getUMI6(ev))]: 1
          }
        }
      })
      return acc
    }
  }, [])
}

const insertDispersionIndex = (courseObj) => {
  for (let i = 1; i <= 6; i++) {
    let UMI = 'UMI' + i
    courseObj[UMI].dispersionIndex = calculate.dispersionIndex(courseObj[UMI].count)
  }
  return courseObj
}

const insertAvg = (courseObj) => {
  for (let i = 1; i <= 6; i++) {
    let UMI = 'UMI' + i
    courseObj[UMI].average = calculate.umiAvg(courseObj[UMI].count)
  }
  return courseObj
}

const insertPercentFav = (courseObj) => {
  for (let i = 1; i <= 6; i++) {
    let UMI = 'UMI' + i
    courseObj[UMI].percentFavourable = calculate.percentFavourable(courseObj[UMI].count)
  }
  return courseObj
}

const insertPercentileRanking = (courseObjs) => {
  let sortedByUMI
  for (let i = 1; i <= 6; i++) {
    let UMI = 'UMI' + i
    sortedByUMI = R.sort((a, b) => a[UMI].average - b[UMI].average, courseObjs)
    sortedByUMI.map((course) => {
      const filteredByTerm = sortedByUMI.filter(x => x.year === course.year && x.term === course.term)
      const filteredByDept = filteredByTerm.filter(x => x.dept === course.dept)
      course[UMI].percentileRankingByFaculty = calculate.percentileRankingOfCourse(course, UMI, filteredByTerm)
      course[UMI].percentileRankingByDept = calculate.percentileRankingOfCourse(course, UMI, filteredByDept)
    })
  }
  return sortedByUMI
}

readCSV('realdata.csv', (csv) => {
  const courseObjs = createCourseObj(csv)

  courseObjs.map(courseObj => R.pipe(
    x => insertDispersionIndex(x),
    x => insertAvg(x),
    x => insertPercentFav(x)
  )(courseObj))

  const courseObjWithPercentileRanking = insertPercentileRanking(courseObjs)

  readCSV('course_eval_enrollments-2009-2017SA.csv', (csv) => {
    csv.map(enrolmentCourse => {
      const { enrolmentCourseName, enrolmentCourseID, enrolmentSection, enrolmentYear, enrolmentTerm, enrolment } =
        {
          enrolmentCourseName: enrolmentCourse.crsname,
          enrolmentCourseID: getFromCSV.getEnrolmentCourseNumber(enrolmentCourse.crsnum),
          enrolmentSection: getFromCSV.getEnrolmentSection(enrolmentCourse.section),
          enrolmentYear: getFromCSV.getEnrolmentYear(enrolmentCourse.period),
          enrolmentTerm: getFromCSV.getEnrolmentTerm(enrolmentCourse.period),
          enrolment: enrolmentCourse.no_enrolled
        }

      courseObjWithPercentileRanking.map(course => {
        const { courseName, courseID, section, year, term } =
          {
            courseName: course.courseName,
            courseID: course.course,
            section: course.section,
            year: course.year,
            term: course.term
          }
        if (courseName === enrolmentCourseName && courseID === enrolmentCourseID && section === enrolmentSection && year === enrolmentYear && term === enrolmentTerm) {
          // add in enrolment and response rate into course
          course.enrolment = enrolment
          const responses = course.gender.Female + course.gender.Male
          const responseRate = calculate.toTwoDecimal(responses / enrolment)
          course.responseRate = responseRate
          course.meetsMin = calculate.meetsMinimum(enrolment, responseRate)
          // have to add in if responses meet minimum required
        }
      })
    })
    writeToDB(courseObjWithPercentileRanking)
  })
})

export {
  createCourseObj,
  insertDispersionIndex,
  insertAvg,
  insertPercentFav,
  insertPercentileRanking
}
