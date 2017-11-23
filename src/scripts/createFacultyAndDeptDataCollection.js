import R from 'ramda'
import { readDataByYear, writeToDB, clearCollection } from '../service/dbService'
import { umiAvg } from '../utils/calculate'

const createAverage = (data) => {
  const depts = R.uniq(data.map(x => x.dept))
  const joinYearAndTerm = (year, term) => year + term
  const yearAndTerms = R.uniq(data.map(x => joinYearAndTerm(x.year, x.term)))

  const groupedByDepts = depts.map(dept => data.filter(section => section.dept === dept))

  const groupedByDeptsThenYearAndTerm = groupedByDepts.map(allSectionsInDept =>
    yearAndTerms.map(yearAndTerm =>
      allSectionsInDept.filter(section =>
        joinYearAndTerm(section.year, section.term) === yearAndTerm)
    ).filter(arr => arr.length > 0)
  )

  const result = []

  groupedByDeptsThenYearAndTerm.map(dept => {
    const deptName = dept[0][0].dept
    result.push({
      department: deptName,
      data: []
    })
    dept.map(yearAndTerm => {
      const tempObj = yearAndTerm.reduce((acc, cur) => {
        for (let umiIndex = 1; umiIndex <= 6; umiIndex++) {
          acc['UMI' + umiIndex] = acc['UMI' + umiIndex] || cur['UMI' + umiIndex].count

          for (let scoreIndex = 1; scoreIndex <= 5; scoreIndex++) {
            acc['UMI' + umiIndex]['' + scoreIndex] = acc['UMI' + umiIndex]['' + scoreIndex] + cur['UMI' + umiIndex].count['' + scoreIndex] || cur['UMI' + umiIndex].count['' + scoreIndex]
          }

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

readDataByYear('2016', 'aggregatedData', (aggregatedData) => {
  const toWrite = createAverage(aggregatedData)
  clearCollection('facultyDeptData')
  writeToDB(toWrite, 'facultyDeptData')
})

export {
  createAverage
}
