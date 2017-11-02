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

  const averageUMI1 = R.mean(UMI1)
  const averageUMI2 = R.mean(UMI2)
  const averageUMI3 = R.mean(UMI3)
  const averageUMI4 = R.mean(UMI4)
  const averageUMI5 = R.mean(UMI5)
  const averageUMI6 = R.mean(UMI6)
  
  // console.log(UMI1.length, UMI2.length, UMI3.length, UMI4.length, UMI5.length, UMI6.length)
  const averageLength = R.mean([UMI1.length, UMI2.length, UMI3.length, UMI4.length, UMI5.length, UMI6.length])

  return ({
    UMI1: averageUMI1,
    UMI2: averageUMI2,
    UMI3: averageUMI3,
    UMI4: averageUMI4,
    UMI5: averageUMI5,
    UMI6: averageUMI6,
    averageLength
  })
}

const averageByYear = (csv) => {
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
  console.log(JSON.stringify(averageUMI, null, 2))
  return averageUMI
}

readCSV('../scripts/source/rawDataAll.csv', (csv) => {
  const toWrite = averageByYear(csv)
  clearCollection('facultyDeptData')
  writeToDB(toWrite, 'facultyDeptData')
})
