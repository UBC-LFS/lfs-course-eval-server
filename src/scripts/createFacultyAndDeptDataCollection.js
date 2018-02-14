import R from 'ramda'
import { umiAvg } from '../utils/calculate'
import assert from 'assert'
import jsonfile from 'jsonfile'
import * as collection from '../utils/constants'

const createFacultyAverage = data => {
  // console.log(JSON.stringify(data))
  const joinYearAndTerm = (year, term) => year + term
  const yearAndTerms = R.uniq(data.map(x => joinYearAndTerm(x.year, x.term)))
  //group sections by faculty to find faculty average
  const groupedFacultyByYearAndTerm =
    [yearAndTerms.map(facyearAndTerm =>
      data.filter(section =>
        joinYearAndTerm(section.year, section.term) === facyearAndTerm)
    ).filter(arr => arr.length > 0)]
  const faculty = groupedFacultyByYearAndTerm[0]
  const result = []
  //insert faculty average calculations into result
  result.push({
    department: 'faculty',
    data: []
  })
  faculty.map(facyearAndTerm => {
    const facultyObj = facyearAndTerm.reduce((facc, fcur) => {
      for (let umiIndex = 1; umiIndex <= 6; umiIndex++) {
        if (facc['UMI' + umiIndex]) {
          for (let scoreIndex = 1; scoreIndex <= 5; scoreIndex++) {
            facc['UMI' + umiIndex]['' + scoreIndex] = facc['UMI' + umiIndex]['' + scoreIndex] + fcur['UMI' + umiIndex].count['' + scoreIndex] || fcur['UMI' + umiIndex].count['' + scoreIndex]
          }
        } else facc['UMI' + umiIndex] = fcur['UMI' + umiIndex].count
        facc['UMI' + umiIndex + 'Avg'] = umiAvg(facc['UMI' + umiIndex])
      }
      facc.length = facc.length + 1 || 1
      facc.year = fcur.year
      facc.term = fcur.term
      return facc
    }, {})
  //  console.log(JSON.stringify(facyearAndTerm))
    const index = result.findIndex(x => x.department === 'faculty')
    result[index].data.push({
      UMI1: facultyObj.UMI1Avg,
      UMI2: facultyObj.UMI2Avg,
      UMI3: facultyObj.UMI3Avg,
      UMI4: facultyObj.UMI4Avg,
      UMI5: facultyObj.UMI5Avg,
      UMI6: facultyObj.UMI6Avg,
      year: facultyObj.year,
      term: facultyObj.term,
      length: facultyObj.length
    })
  })
  return result
}
const createDeptAverage = data => {
  const depts = R.uniq(data.map(x => x.dept))
  const joinYearAndTerm = (year, term) => year + term
  const yearAndTerms = R.uniq(data.map(x => joinYearAndTerm(x.year, x.term)))

  //groups sections by department to find department average
  const groupedByDepts = depts.map(dept =>
    data.filter(section => section.dept === dept))

  const groupedByDeptsThenYearAndTerm = groupedByDepts.map(allSectionsInDept =>
    yearAndTerms.map(yearAndTerm =>
      allSectionsInDept.filter(section =>
        joinYearAndTerm(section.year, section.term) === yearAndTerm)
    ).filter(arr => arr.length > 0)
  )
  const result = []
  //insert department average calculations into result
  groupedByDeptsThenYearAndTerm.map(dept => {
    const deptName = dept[0][0].dept
    result.push({
      department: deptName,
      data: []
    })
    dept.map(yearAndTerm => {
      const tempObj = yearAndTerm.reduce((acc, cur) => {
        for (let umiIndex = 1; umiIndex <= 6; umiIndex++) {
          if (acc['UMI' + umiIndex]) {
            for (let scoreIndex = 1; scoreIndex <= 5; scoreIndex++) {
              acc['UMI' + umiIndex]['' + scoreIndex] = acc['UMI' + umiIndex]['' + scoreIndex] + cur['UMI' + umiIndex].count['' + scoreIndex] || cur['UMI' + umiIndex].count['' + scoreIndex]
            }
          } else acc['UMI' + umiIndex] = cur['UMI' + umiIndex].count
          acc['UMI' + umiIndex + 'Avg'] = umiAvg(acc['UMI' + umiIndex])
        }
        acc.length = acc.length + 1 || 1
        acc.year = cur.year
        acc.term = cur.term
        return acc
      }, {})

      const index = result.findIndex(x => x.department === deptName)
      result[index].data.push({
        UMI1: tempObj.UMI1Avg,
        UMI2: tempObj.UMI2Avg,
        UMI3: tempObj.UMI3Avg,
        UMI4: tempObj.UMI4Avg,
        UMI5: tempObj.UMI5Avg,
        UMI6: tempObj.UMI6Avg,
        year: tempObj.year,
        term: tempObj.term,
        length: tempObj.length
      })
    })
  })
  return result
}

const createAverage = data => {
  const newArr = R.clone(data)

  const facultyAverage = createFacultyAverage(data)

  const deptAverage = createDeptAverage(newArr)
  return [...facultyAverage, ...deptAverage]
}

const outputFacultyDeptData = cb => {
  jsonfile.readFile('./output/' + collection.aggregatedData + '.json', (err, json) => {
    assert.equal(null, err)
    const file = './output/' + collection.facultyDeptData + '.json'
    const result = createAverage(json)
    jsonfile.writeFile(file, result, (err) => assert.equal(null, err))
    cb()
  })
}

export {
  createAverage,
  outputFacultyDeptData
}
