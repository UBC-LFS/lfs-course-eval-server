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
  const uniqYears = getFromCSV.getUniqYears(csv)
  const uniqDepts = getFromCSV.getUniqDepts(csv)

  const averageUMI = []

  uniqYears.map(year => {
    const filteredByYear = filterCSV.byYear(year)(csv)

    uniqDepts.map(dept => {
      const filteredByDeptAndYear = filterCSV.byDept(dept)(filteredByYear)

      if (averageUMI.some(x => x.hasOwnProperty(String(year)))) {
        const index = averageUMI.findIndex(x => x.hasOwnProperty(String(year)))
        averageUMI[index][year][dept + 'Average'] = calculateAverage(filteredByDeptAndYear)
      } else {
        averageUMI.push({
          [year]: {
            facultyAverage: calculateAverage(filteredByYear),
            [dept + 'Average']: calculateAverage(filteredByDeptAndYear)
          }
        })
      }
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
