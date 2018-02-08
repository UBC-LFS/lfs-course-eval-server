import jsonfile from 'jsonfile'
import * as collection from '../utils/constants'
import R from 'ramda'
import assert from 'assert'

const notBetween0and1 = number => R.not(number >= 0 && number <= 1)

const checkForMissingEnrolments = data => data.filter(section => !section.hasOwnProperty('enrolment'))
const checkForEnrolmentsThatAreNotNumbers = data => data.filter(section => !Number.isInteger(section.enrolment))
const checkForOnePUID = data => {
  const arrOfNames = R.uniq(data.map(section => [section.instructorName, section.PUID])).map(arr => arr[0])
  const uniqArrOfNames = R.uniq(R.uniq(data.map(section => [section.instructorName, section.PUID])).map(arr => arr[0]))
  if (arrOfNames.length !== uniqArrOfNames.length) {
    const sortedArrOfNames = arrOfNames.sort()
    return sortedArrOfNames.filter((name, i) => name === sortedArrOfNames[i + 1])
  }
  return false
}
const checkMissingProperties = data => data.filter(section => {
  return R.not(section.hasOwnProperty('PUID') &&
    section.hasOwnProperty('UMI1') &&
    section.hasOwnProperty('UMI1') &&
    section.hasOwnProperty('UMI2') &&
    section.hasOwnProperty('UMI3') &&
    section.hasOwnProperty('UMI4') &&
    section.hasOwnProperty('UMI5') &&
    section.hasOwnProperty('UMI6') &&
    section.hasOwnProperty('course') &&
    section.hasOwnProperty('courseLevel') &&
    section.hasOwnProperty('courseName') &&
    section.hasOwnProperty('dept') &&
    section.hasOwnProperty('enrolment') &&
    section.hasOwnProperty('gender') &&
    section.hasOwnProperty('instructorName') &&
    section.hasOwnProperty('meetsMin') &&
    section.hasOwnProperty('responseRate') &&
    section.hasOwnProperty('section') &&
    section.hasOwnProperty('term') &&
    section.hasOwnProperty('year'))
})

const checkResponseRate = data => data.filter(section => notBetween0and1(section.responseRate))
const checkDispersion = UMIs => UMIs.filter(UMI => notBetween0and1(UMI.dispersionIndex) || notBetween0and1(UMI.percentFavourable) || notBetween0and1(UMI.percentileRankingByDept) || notBetween0and1(UMI.percentileRankingByFaculty))

jsonfile.readFile('./output/' + collection.aggregatedData + '.json', (err, data) => {
  assert.equal(null, err)

  const missingEnrolments = checkForMissingEnrolments(data)
  const NaNEnrolments = checkForEnrolmentsThatAreNotNumbers(data)
  const onePUID = checkForOnePUID(data)
  const missingProperties = checkMissingProperties(data)
  const responseRate = checkResponseRate(data)

  if (missingEnrolments.length > 0 || NaNEnrolments.length > 0) {
    console.log('These courses are missing enrolment information: ', missingEnrolments, NaNEnrolments)
  }
  if (onePUID) console.log('The following instructors has multiple PUIDs: ', onePUID)
  if (missingProperties.length > 0) console.log('These courses are missing some properties', missingProperties)
  if (responseRate.length > 0) console.log('These courses have invalid response rates', responseRate)
  else console.log('No errors were detected!')
})
