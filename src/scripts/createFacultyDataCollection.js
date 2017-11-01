import * as getFromCSV from './scriptUtils/getFromCSV'
import * as filterCSV from './scriptUtils/filterCSV'
import R from 'ramda'
import readCSV from '../service/readCSV'

const facultyAverageByYear = (csv) => {
  const uniqYears = getFromCSV.getUniqYears(csv)
  const averageUMIByYear = []

  uniqYears.map(year => {
    const filteredByYear = filterCSV.byYear(year)(csv)

    const UMI1 = filterCSV.byUMI1(filteredByYear)
    const UMI2 = filterCSV.byUMI2(filteredByYear)
    const UMI3 = filterCSV.byUMI3(filteredByYear)
    const UMI4 = filterCSV.byUMI4(filteredByYear)
    const UMI5 = filterCSV.byUMI5(filteredByYear)
    const UMI6 = filterCSV.byUMI6(filteredByYear)

    const averageUMI1 = R.mean(UMI1)
    const averageUMI2 = R.mean(UMI2)
    const averageUMI3 = R.mean(UMI3)
    const averageUMI4 = R.mean(UMI4)
    const averageUMI5 = R.mean(UMI5)
    const averageUMI6 = R.mean(UMI6)

    averageUMIByYear.push(
      { year, UMI1: averageUMI1, UMI2: averageUMI2, UMI3: averageUMI3, UMI4: averageUMI4, UMI5: averageUMI5, UMI6: averageUMI6 }
    )
  })

  console.log(averageUMIByYear)
}

readCSV('../scripts/source/rawDataAll.csv', (csv) => {
  facultyAverageByYear(csv)
})
