import jsonfile from 'jsonfile'
import assert from 'assert'
import * as collection from '../utils/constants'

const checkForMissingEnrolments = data => data.filter(section => !section.hasOwnProperty('enrolment'))
const checkForEnrolmentsThatAreNotNumbers = data => data.filter(section => !Number.isInteger(section.enrolment))

jsonfile.readFile('./output/' + collection.aggregatedData + '.json', (err, data) => {
  assert.equal(null, err)
})
