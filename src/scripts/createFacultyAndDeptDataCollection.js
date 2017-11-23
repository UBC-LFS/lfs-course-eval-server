import * as filterCSV from './scriptUtils/filterCSV'
import R from 'ramda'
import { readDataByYear, writeToDB, clearCollection } from '../service/dbService'
import { umiAvg } from '../utils/calculate'

const calculateAverage = (filteredArray) => {
  const UMI1 = filterCSV.byUMI1(filteredArray)
  const UMI2 = filterCSV.byUMI2(filteredArray)
  const UMI3 = filterCSV.byUMI3(filteredArray)
  const UMI4 = filterCSV.byUMI4(filteredArray)
  const UMI5 = filterCSV.byUMI5(filteredArray)
  const UMI6 = filterCSV.byUMI6(filteredArray)

  const averageLength = Math.round(R.mean([UMI1.length, UMI2.length, UMI3.length, UMI4.length, UMI5.length, UMI6.length]))

  return ({
    UMI1: R.mean(UMI1),
    UMI2: R.mean(UMI2),
    UMI3: R.mean(UMI3),
    UMI4: R.mean(UMI4),
    UMI5: R.mean(UMI5),
    UMI6: R.mean(UMI6),
    averageLength
  })
}

const createAverageByYear = (data) => {
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
        for (let i = 1; i <= 6; i++) {
          acc['UMI' + i] = acc['UMI' + i] || cur['UMI' + i].count
          
          for (let s = 1; s <= 5; s++) {
            acc['UMI' + i]['' + s] = acc['UMI' + i]['' + i] + cur['UMI' + i].count['' + s] || cur['UMI' + i].count['' + s]
          }

          acc['UMI' + i + 'Avg'] = umiAvg(acc['UMI' + i])
        }
        acc.length = acc.length + 1 || 1
        acc.year = cur.year
        acc.term = cur.term
        return acc
      }, {})
      const finalObj = {
        UMI1: tempObj.UMI1Avg,
        UMI2: tempObj.UMI2Avg,
        UMI3: tempObj.UMI3Avg,
        UMI4: tempObj.UMI4Avg,
        UMI5: tempObj.UMI5Avg,
        UMI6: tempObj.UMI6Avg,
        year: tempObj.year,
        term: tempObj.term
      }
      const index = result.findIndex(x => x.department === deptName)
      result[index].data.push(finalObj)
    })
  })
  return result
}

readDataByYear('2016', 'aggregatedData', (aggregatedData) => {
  const toWrite = createAverageByYear(aggregatedData)
  clearCollection('facultyDeptData')
  writeToDB(toWrite, 'facultyDeptData')
})

export {
  calculateAverage,
  createAverageByYear
}
