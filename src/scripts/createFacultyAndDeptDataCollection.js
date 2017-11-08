import * as getFromCSV from './scriptUtils/getFromCSV'
import * as filterCSV from './scriptUtils/filterCSV'
import R from 'ramda'
import readCSV from '../service/readCSV'
import { writeToDB, clearCollection } from '../service/dbService'

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

const createAverageByYear = (csv) => {
  const averageUMI = []

  const uniqYears = getFromCSV.getUniqYears(csv)

  const hasYear = year => x => x.hasOwnProperty(String(year))

  uniqYears.map(year => {
    const filteredByYear = filterCSV.byYear(year)(csv)
    const uniqTerms = getFromCSV.getUniqTerms(filteredByYear)

    uniqTerms.map(term => {
      const filteredByYearAndTerm = filterCSV.byTerm(term)(filteredByYear)
      const uniqDepts = getFromCSV.getUniqDepts(filteredByYearAndTerm)

      uniqDepts.map(dept => {
        const filteredByYearAndDept = filterCSV.byDept(dept)(filteredByYear)
        const filteredByYearTermAndDept = filterCSV.byDept(dept)(filteredByYearAndTerm)

        if (averageUMI.some(hasYear(year))) {
          const yearIndex = averageUMI.findIndex(hasYear(year))
          averageUMI[yearIndex][year]['facultyAverage'] = calculateAverage(filteredByYear)
          averageUMI[yearIndex][year][dept + 'Average'] = calculateAverage(filteredByYearAndDept)
          if (averageUMI[yearIndex][year][term]) {
            averageUMI[yearIndex][year][term]['facultyAverage'] = calculateAverage(filteredByYearAndTerm)
            averageUMI[yearIndex][year][term][dept + 'Average'] = calculateAverage(filteredByYearTermAndDept)
          } else {
            averageUMI[yearIndex][year][term] = {
              'facultyAverage': calculateAverage(filteredByYearAndTerm),
              [dept + 'Average']: calculateAverage(filteredByYearTermAndDept)
            }
          }
        } else {
          averageUMI.push({
            [year]: {
              'facultyAverage': calculateAverage(filteredByYear),
              [dept + 'Average']: calculateAverage(filteredByYearAndDept),
              [term]: {
                'facultyAverage': calculateAverage(filteredByYearAndTerm),
                [dept + 'Average']: calculateAverage(filteredByYearTermAndDept)
              }
            }
          })
        }
      })
    })
  })
  return averageUMI
}

readCSV('../scripts/source/rawDataAll.csv', (csv) => {
  const toWrite = createAverageByYear(csv)
  clearCollection('facultyDeptData')
  writeToDB(toWrite, 'facultyDeptData')
})

export {
  calculateAverage,
  createAverageByYear
}
