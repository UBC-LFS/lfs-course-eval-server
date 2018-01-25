import jsonfile from 'jsonfile'
import * as collection from '../utils/constants'
import R from 'ramda'

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

jsonfile.readFile('./output/' + collection.aggregatedData + '.json', (err, data) => {
  assert.equal(null, err)

  const missingEnrolments = checkForMissingEnrolments(data)
  const NaNEnrolments = checkForEnrolmentsThatAreNotNumbers(data)
  const onePUID = checkForOnePUID(data)

  if (missingEnrolments.length > 0 || NaNEnrolments.length > 0) console.log('These courses are missing enrolment information: ', missingEnrolments, NaNEnrolments)
  if (onePUID) console.log('The following instructors has multiple PUIDs: ', onePUID)

})
