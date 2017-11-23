import * as filterCSV from './scriptUtils/filterCSV'
import R from 'ramda'
import readCSV from '../service/readCSV'
import { readDataByYear, writeToDB, clearCollection } from '../service/dbService'
import { join } from 'path';

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
  const separateYearAndTerm = (yearTerm) => [Number(yearTerm.slice(0, 4)), yearTerm.slice(4)]
  const yearAndTerms = R.uniq(data.map(x => joinYearAndTerm(x.year, x.term)))

  const groupedByDepts = depts.map(dept => data.filter(section => section.dept === dept))

  const groupedByDeptsThenYearAndTerm = groupedByDepts.map(allSectionsInDept =>
    yearAndTerms.map(yearAndTerm =>
      allSectionsInDept.filter(section =>
        joinYearAndTerm(section.year, section.term) === yearAndTerm)
    ).filter(arr => arr.length > 0)
  )

  console.log(JSON.stringify(groupedByDeptsThenYearAndTerm, null, 2))
  // const result = []

  // groupedByDepts.map(allSectionsInDept => {
  //   const termAndYears = allSectionsInDept.map(section => )
  // })

  // const averageUMI = []

  // const uniqYears = getFromCSV.getUniqYears(csv)

  // const hasYear = year => x => x.hasOwnProperty(String(year))

  // uniqYears.map(year => {
  //   const filteredByYear = filterCSV.byYear(year)(csv)
  //   const uniqTerms = getFromCSV.getUniqTerms(filteredByYear)

  //   uniqTerms.map(term => {
  //     const filteredByYearAndTerm = filterCSV.byTerm(term)(filteredByYear)
  //     const uniqDepts = getFromCSV.getUniqDepts(filteredByYearAndTerm)

  //     uniqDepts.map(dept => {
  //       const filteredByYearAndDept = filterCSV.byDept(dept)(filteredByYear)
  //       const filteredByYearTermAndDept = filterCSV.byDept(dept)(filteredByYearAndTerm)

  //       if (averageUMI.some(hasYear(year))) {
  //         const yearIndex = averageUMI.findIndex(hasYear(year))
  //         averageUMI[yearIndex][year]['facultyAverage'] = calculateAverage(filteredByYear)
  //         averageUMI[yearIndex][year][dept + 'Average'] = calculateAverage(filteredByYearAndDept)
  //         if (averageUMI[yearIndex][year][term]) {
  //           averageUMI[yearIndex][year][term]['facultyAverage'] = calculateAverage(filteredByYearAndTerm)
  //           averageUMI[yearIndex][year][term][dept + 'Average'] = calculateAverage(filteredByYearTermAndDept)
  //         } else {
  //           averageUMI[yearIndex][year][term] = {
  //             'facultyAverage': calculateAverage(filteredByYearAndTerm),
  //             [dept + 'Average']: calculateAverage(filteredByYearTermAndDept)
  //           }
  //         }
  //       } else {
  //         averageUMI.push({
  //           [year]: {
  //             'facultyAverage': calculateAverage(filteredByYear),
  //             [dept + 'Average']: calculateAverage(filteredByYearAndDept),
  //             [term]: {
  //               'facultyAverage': calculateAverage(filteredByYearAndTerm),
  //               [dept + 'Average']: calculateAverage(filteredByYearTermAndDept)
  //             }
  //           }
  //         })
  //       }
  //     })
  //   })
  // })
  // return averageUMI
}

readDataByYear('2016', 'aggregatedData', (aggregatedData) => {
  const toWrite = createAverageByYear(aggregatedData)
  clearCollection('facultyDeptData')
  // writeToDB(toWrite, 'facultyDeptData')
})

export {
  calculateAverage,
  createAverageByYear
}
