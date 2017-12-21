import assert from 'assert'
import jsonfile from 'jsonfile'
import R from 'ramda'

const createMetaData = json => ([{
  years: R.uniq(json
    .map(section => section.year)
    .sort((a, b) => a - b)
  ),
  depts: R.uniq(json
    .map(section => section.dept)
    .sort()
  ),
  instructors: R.uniq(json
    .map(section => section.instructorName)
    .sort()
  )
}])

const outputMetaData = () => {
  jsonfile.readFile('./output/aggregatedData.json', (err, json) => {
    assert.equal(null, err)
    const metaData = createMetaData(json)
    const file = './output/metaData.json'
    jsonfile.writeFile(file, metaData, (err) => assert.equal(null, err))
  })
}

export {
  outputMetaData
}
