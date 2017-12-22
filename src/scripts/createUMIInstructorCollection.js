import R from 'ramda'
import assert from 'assert'
import jsonfile from 'jsonfile'
import * as collection from '../utils/constants'

const aggregateUMIInstructor = data => {
  const byInstructor = R.groupBy(course => course.PUID)(data)
  return Object.keys(byInstructor).map(key => ({
    PUID: key,
    Courses: byInstructor[key]
  }))
}

const outputUMIInstructor = cb => {
  jsonfile.readFile('./output/' + collection.aggregatedData + '.json', (err, json) => {
    assert.equal(null, err)
    const file = './output/' + collection.umiInstructor + '.json'
    const result = aggregateUMIInstructor(json)
    jsonfile.writeFile(file, result, (err) => assert.equal(null, err))
    cb()
  })
}

export {
  aggregateUMIInstructor,
  outputUMIInstructor
}
