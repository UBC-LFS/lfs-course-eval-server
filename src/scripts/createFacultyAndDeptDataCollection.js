import R from 'ramda'
import { umiAvg, sumCount } from '../utils/calculate'
import assert from 'assert'
import jsonfile from 'jsonfile'
import * as collection from '../utils/constants'

const createTermCalculations = (object, data) => {
  const splitIntoTerms = data.reduce((acc, section) => {
    const year = section.year
    const term = section.term
    const key = year + term

    const object = acc.find(obj => obj.hasOwnProperty(key))
    if (object) {
      object[key].push(section)
    } else {
      const newObj = {
        [key]: [section]
      }
      acc.push(newObj)
    }
    return acc
  }, [])

  const dataObj = splitIntoTerms
    .map(section => Object.values(section)[0])
    .map(sections => ({
      'term': sections[0].term,
      'year': sections[0].year,
      'UMI1': umiAvg(sumCount(sections.map(section => section.UMI1.count))),
      'UMI2': umiAvg(sumCount(sections.map(section => section.UMI2.count))),
      'UMI3': umiAvg(sumCount(sections.map(section => section.UMI3.count))),
      'UMI4': umiAvg(sumCount(sections.map(section => section.UMI4.count))),
      'UMI5': umiAvg(sumCount(sections.map(section => section.UMI5.count))),
      'UMI6': umiAvg(sumCount(sections.map(section => section.UMI6.count))),
      'length': sections.length
    }))
  object.data = dataObj
  return object
}

const createAverageDept = data => {
  const departments = R.uniq(data.map(section => section.dept))
  const filteredByDept = departments
    .map(dept => data.filter(section => section.dept === dept))
  const calculateAverage = filteredByDept.map(deptSections => {
    const deptObj = {
      'department': deptSections[0].dept
    }
    return createTermCalculations(deptObj, deptSections)
  })
  return calculateAverage
}

const createAverageFaculty = data => {
  const facultyObj = {
    'department': 'faculty'
  }
  return createTermCalculations(facultyObj, data)
}

const createAverage = data => {
  const deptResult = createAverageDept(data)
  const facultyResult = createAverageFaculty(data)
  return [...deptResult, facultyResult]
}

const outputFacultyDeptData = cb => {
  jsonfile.readFile('./output/' + collection.aggregatedData + '.json', (err, json) => {
    assert.equal(null, err)
    const file = './output/' + collection.facultyDeptData + '.json'
    const result = createAverage(json)
    jsonfile.writeFile(file, result, err => assert.equal(null, err))
    cb()
  })
}

export {
    createAverage,
    outputFacultyDeptData
}
