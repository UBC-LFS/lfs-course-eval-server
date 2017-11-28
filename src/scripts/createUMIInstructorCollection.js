import R from 'ramda'
import assert from 'assert'
import jsonfile from 'jsonfile'

const aggregateUMIInstructor = (data) => {
  const byInstructor = R.groupBy((course) => course.PUID)(data)
  return Object.keys(byInstructor).map(key => ({
    PUID: key,
    Courses: byInstructor[key]
  }))
}

const outputUMIInstructor = (cb) => {
  jsonfile.readFile('./output/aggregatedData.json', (err, json) => {
    assert.equal(null, err)
    const file = './output/UMIInstructorData.json'
    const result = aggregateUMIInstructor(json)
    jsonfile.writeFile(file, result, (err) => assert.equal(null, err))
    cb()
  })
}

export {
  aggregateUMIInstructor,
  outputUMIInstructor
}
