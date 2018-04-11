import assert from 'assert'
import jsonfile from 'jsonfile'
import R from 'ramda'
import * as collection from '../utils/constants'
import * as sort from '../utils/sort'

const minClassSize = array => {
  return array.reduce(function (prev, curr) {
    return prev.enrolment < curr.enrolment ? prev : curr
  }, array[0]).enrolment
}

const maxClassSize = array => {
  return array.reduce(function (prev, curr) {
    return prev.enrolment > curr.enrolment ? prev : curr
  }, array[0]).enrolment
}

const createInstructorData = json => {
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
  return instructorArray
}

const createYearData = json => {
  const groupCoursesByYear = R.groupBy(function (section) {
    return section.year
  })(json)

  const years = Object.keys(groupCoursesByYear).sort((a, b) => a - b)
  const yearArray = []
  for (let i = 0; i < years.length; i++) {
    const year = {
      'year': years[i],
      'minClassSize': minClassSize(groupCoursesByYear[years[i]]),
      'maxClassSize': maxClassSize(groupCoursesByYear[years[i]])
    }
    yearArray.push(year)
  }
  return yearArray
}

const createMetaData = json => {
  const instructorArray = createInstructorData(json)
  const yearArray = createYearData(json)
  return ([{
    years: yearArray,
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
  outputMetaData,
  createInstructorData,
  createYearData,
  createMetaData
}
