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

  groupedByDeptsThenYearAndTerm.map(depts => {
    depts.map(yearAndTerm => {
      const obj = yearAndTerm.reduce((acc, cur) => {
        acc['UMI1'] = acc['UMI1'] || cur['UMI1'].count
        acc['UMI2'] = acc['UMI2'] || cur['UMI2'].count
        acc['UMI3'] = acc['UMI3'] || cur['UMI3'].count
        acc['UMI4'] = acc['UMI4'] || cur['UMI4'].count
        acc['UMI5'] = acc['UMI5'] || cur['UMI5'].count
        acc['UMI6'] = acc['UMI6'] || cur['UMI6'].count

        acc['UMI1']['1'] = acc['UMI1']['1'] + cur['UMI1'].count['1'] || cur['UMI1'].count['1']
        acc['UMI1']['2'] = acc['UMI1']['2'] + cur['UMI1'].count['2'] || cur['UMI1'].count['2']
        acc['UMI1']['3'] = acc['UMI1']['3'] + cur['UMI1'].count['3'] || cur['UMI1'].count['3']
        acc['UMI1']['4'] = acc['UMI1']['4'] + cur['UMI1'].count['4'] || cur['UMI1'].count['4']
        acc['UMI1']['5'] = acc['UMI1']['5'] + cur['UMI1'].count['5'] || cur['UMI1'].count['5']

        acc['UMI2']['1'] = acc['UMI1']['1'] + cur['UMI1'].count['1'] || cur['UMI1'].count['1']
        acc['UMI2']['2'] = acc['UMI1']['2'] + cur['UMI1'].count['2'] || cur['UMI1'].count['2']
        acc['UMI2']['3'] = acc['UMI1']['3'] + cur['UMI1'].count['3'] || cur['UMI1'].count['3']
        acc['UMI2']['4'] = acc['UMI1']['4'] + cur['UMI1'].count['4'] || cur['UMI1'].count['4']
        acc['UMI2']['5'] = acc['UMI1']['5'] + cur['UMI1'].count['5'] || cur['UMI1'].count['5']

        acc['UMI3']['1'] = acc['UMI1']['1'] + cur['UMI1'].count['1'] || cur['UMI1'].count['1']
        acc['UMI3']['2'] = acc['UMI1']['2'] + cur['UMI1'].count['2'] || cur['UMI1'].count['2']
        acc['UMI3']['3'] = acc['UMI1']['3'] + cur['UMI1'].count['3'] || cur['UMI1'].count['3']
        acc['UMI3']['4'] = acc['UMI1']['4'] + cur['UMI1'].count['4'] || cur['UMI1'].count['4']
        acc['UMI3']['5'] = acc['UMI1']['5'] + cur['UMI1'].count['5'] || cur['UMI1'].count['5']

        acc['UMI4']['1'] = acc['UMI1']['1'] + cur['UMI1'].count['1'] || cur['UMI1'].count['1']
        acc['UMI4']['2'] = acc['UMI1']['2'] + cur['UMI1'].count['2'] || cur['UMI1'].count['2']
        acc['UMI4']['3'] = acc['UMI1']['3'] + cur['UMI1'].count['3'] || cur['UMI1'].count['3']
        acc['UMI4']['4'] = acc['UMI1']['4'] + cur['UMI1'].count['4'] || cur['UMI1'].count['4']
        acc['UMI4']['5'] = acc['UMI1']['5'] + cur['UMI1'].count['5'] || cur['UMI1'].count['5']

        acc['UMI5']['1'] = acc['UMI1']['1'] + cur['UMI1'].count['1'] || cur['UMI1'].count['1']
        acc['UMI5']['2'] = acc['UMI1']['2'] + cur['UMI1'].count['2'] || cur['UMI1'].count['2']
        acc['UMI5']['3'] = acc['UMI1']['3'] + cur['UMI1'].count['3'] || cur['UMI1'].count['3']
        acc['UMI5']['4'] = acc['UMI1']['4'] + cur['UMI1'].count['4'] || cur['UMI1'].count['4']
        acc['UMI5']['5'] = acc['UMI1']['5'] + cur['UMI1'].count['5'] || cur['UMI1'].count['5']

        acc['UMI6']['1'] = acc['UMI1']['1'] + cur['UMI1'].count['1'] || cur['UMI1'].count['1']
        acc['UMI6']['2'] = acc['UMI1']['2'] + cur['UMI1'].count['2'] || cur['UMI1'].count['2']
        acc['UMI6']['3'] = acc['UMI1']['3'] + cur['UMI1'].count['3'] || cur['UMI1'].count['3']
        acc['UMI6']['4'] = acc['UMI1']['4'] + cur['UMI1'].count['4'] || cur['UMI1'].count['4']
        acc['UMI6']['5'] = acc['UMI1']['5'] + cur['UMI1'].count['5'] || cur['UMI1'].count['5']
        return acc
      }, {})
      console.log(obj)
    })
  })
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
