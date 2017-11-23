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
        for (let i = 1; i <= 6; i++) {
          acc['UMI' + i] = acc['UMI' + i] || cur['UMI' + i].count

          for (let s = 1; s <= 5; s++) {
            acc['UMI' + i]['' + s] = acc['UMI' + i]['' + s] + cur['UMI' + i].count['' + s] || cur['UMI' + i].count['' + s]
          }

          acc['UMI' + i + 'Avg'] = umiAvg(acc['UMI' + i])
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
        term: tempObj.term
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
