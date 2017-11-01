import * as getFromCSV from './scriptUtils/getFromCSV'
import * as filterCSV from './scriptUtils/filterCSV'
import R from 'ramda'
import readCSV from '../service/readCSV'

const calculateAverageOfFaculty = (filteredArray) => {
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

  return ({ UMI1: averageUMI1, UMI2: averageUMI2, UMI3: averageUMI3, UMI4: averageUMI4, UMI5: averageUMI5, UMI6: averageUMI6 })
}

const facultyAverageByYear = (csv) => {
  const uniqYears = getFromCSV.getUniqYears(csv)
  const averageUMIByYear = []

  uniqYears.map(year => {
    const filteredByYear = filterCSV.byYear(year)(csv)
    averageUMIByYear.push({
      [year]: {
        facultyAverage: calculateAverageOfFaculty(filteredByYear)
      }
    })
  })

  console.log(JSON.stringify(averageUMIByYear, null, 2))
}

readCSV('../scripts/source/rawDataAll.csv', (csv) => {
  facultyAverageByYear(csv)
})
