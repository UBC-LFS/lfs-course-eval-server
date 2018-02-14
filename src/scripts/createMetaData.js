import assert from 'assert'
import jsonfile from 'jsonfile'
import R from 'ramda'
import * as collection from '../utils/constants'
import * as sort from '../utils/sort'

const createMetaData = json => {
  const groupInstructorsBySections = R.groupBy(function (section) {
    return section.PUID
  })(json)
  const instructorArray = R.uniq(json
    .map(section => {
      return ({ name: section.instructorName, PUID: section.PUID })
    })
    .sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1)
  )
  for (let i = 0; i < instructorArray.length; i++) {
    const instructor = R.prop(instructorArray[i].PUID, groupInstructorsBySections)
    instructorArray[i].terms = sort.byYearThenTerm(R.uniq(instructor.map(x => x.year + x.term)))
  }
  return ([{
    years: R.uniq(json
      .map(section => section.year)
      .sort((a, b) => a - b)
    ),
    terms: R.uniq(json
      .map(section => section.term)
      .sort()
    ),
    depts: R.uniq(json
      .map(section => section.dept)
      .sort()
    ),
    instructors: instructorArray
  }])
}

const outputMetaData = () => {
  jsonfile.readFile('./output/' + collection.aggregatedData + '.json', (err, json) => {
    assert.equal(null, err)
    const metaData = createMetaData(json)
    const file = './output/' + collection.metaData + '.json'
    jsonfile.writeFile(file, metaData, err => assert.equal(null, err))
  })
}

export {
  outputMetaData
}
