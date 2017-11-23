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
  const separateYearAndTerm = (yearTerm) => [Number(yearTerm.slice(0, 4)), yearTerm.slice(4)]
  const yearAndTerms = R.uniq(data.map(x => joinYearAndTerm(x.year, x.term)))

  const groupedByDepts = depts.map(dept => data.filter(section => section.dept === dept))

  const groupedByDeptsThenYearAndTerm = groupedByDepts.map(allSectionsInDept =>
    yearAndTerms.map(yearAndTerm =>
      allSectionsInDept.filter(section =>
        joinYearAndTerm(section.year, section.term) === yearAndTerm)
    ).filter(arr => arr.length > 0)
  )

  groupedByDeptsThenYearAndTerm.map(depts => {
    depts.map(yearAndTerm => {
      const obj = yearAndTerm.reduce((acc, cur) => {
        const tempObj = {}

        tempObj['UMI1'] = tempObj['UMI1'] || cur['UMI1'].count
        tempObj['UMI2'] = tempObj['UMI2'] || cur['UMI2'].count
        tempObj['UMI3'] = tempObj['UMI3'] || cur['UMI3'].count
        tempObj['UMI4'] = tempObj['UMI4'] || cur['UMI4'].count
        tempObj['UMI5'] = tempObj['UMI5'] || cur['UMI5'].count
        tempObj['UMI6'] = tempObj['UMI6'] || cur['UMI6'].count

        tempObj['UMI1']['1'] = tempObj['UMI1']['1'] + cur['UMI1'].count['1'] || cur['UMI1'].count['1']
        tempObj['UMI1']['2'] = tempObj['UMI1']['2'] + cur['UMI1'].count['2'] || cur['UMI1'].count['2']
        tempObj['UMI1']['3'] = tempObj['UMI1']['3'] + cur['UMI1'].count['3'] || cur['UMI1'].count['3']
        tempObj['UMI1']['4'] = tempObj['UMI1']['4'] + cur['UMI1'].count['4'] || cur['UMI1'].count['4']
        tempObj['UMI1']['5'] = tempObj['UMI1']['5'] + cur['UMI1'].count['5'] || cur['UMI1'].count['5']

        tempObj['UMI2']['1'] = tempObj['UMI2']['1'] + cur['UMI2'].count['1'] || cur['UMI2'].count['1']
        tempObj['UMI2']['2'] = tempObj['UMI2']['2'] + cur['UMI2'].count['2'] || cur['UMI2'].count['2']
        tempObj['UMI2']['3'] = tempObj['UMI2']['3'] + cur['UMI2'].count['3'] || cur['UMI2'].count['3']
        tempObj['UMI2']['4'] = tempObj['UMI2']['4'] + cur['UMI2'].count['4'] || cur['UMI2'].count['4']
        tempObj['UMI2']['5'] = tempObj['UMI2']['5'] + cur['UMI2'].count['5'] || cur['UMI2'].count['5']

        tempObj['UMI3']['1'] = tempObj['UMI3']['1'] + cur['UMI3'].count['1'] || cur['UMI3'].count['1']
        tempObj['UMI3']['2'] = tempObj['UMI3']['2'] + cur['UMI3'].count['2'] || cur['UMI3'].count['2']
        tempObj['UMI3']['3'] = tempObj['UMI3']['3'] + cur['UMI3'].count['3'] || cur['UMI3'].count['3']
        tempObj['UMI3']['4'] = tempObj['UMI3']['4'] + cur['UMI3'].count['4'] || cur['UMI3'].count['4']
        tempObj['UMI3']['5'] = tempObj['UMI3']['5'] + cur['UMI3'].count['5'] || cur['UMI3'].count['5']

        tempObj['UMI4']['1'] = tempObj['UMI4']['1'] + cur['UMI4'].count['1'] || cur['UMI4'].count['1']
        tempObj['UMI4']['2'] = tempObj['UMI4']['2'] + cur['UMI4'].count['2'] || cur['UMI4'].count['2']
        tempObj['UMI4']['3'] = tempObj['UMI4']['3'] + cur['UMI4'].count['3'] || cur['UMI4'].count['3']
        tempObj['UMI4']['4'] = tempObj['UMI4']['4'] + cur['UMI4'].count['4'] || cur['UMI4'].count['4']
        tempObj['UMI4']['5'] = tempObj['UMI4']['5'] + cur['UMI4'].count['5'] || cur['UMI4'].count['5']

        tempObj['UMI5']['1'] = tempObj['UMI5']['1'] + cur['UMI5'].count['1'] || cur['UMI5'].count['1']
        tempObj['UMI5']['2'] = tempObj['UMI5']['2'] + cur['UMI5'].count['2'] || cur['UMI5'].count['2']
        tempObj['UMI5']['3'] = tempObj['UMI5']['3'] + cur['UMI5'].count['3'] || cur['UMI5'].count['3']
        tempObj['UMI5']['4'] = tempObj['UMI5']['4'] + cur['UMI5'].count['4'] || cur['UMI5'].count['4']
        tempObj['UMI5']['5'] = tempObj['UMI5']['5'] + cur['UMI5'].count['5'] || cur['UMI5'].count['5']

        tempObj['UMI6']['1'] = tempObj['UMI6']['1'] + cur['UMI6'].count['1'] || cur['UMI6'].count['1']
        tempObj['UMI6']['2'] = tempObj['UMI6']['2'] + cur['UMI6'].count['2'] || cur['UMI6'].count['2']
        tempObj['UMI6']['3'] = tempObj['UMI6']['3'] + cur['UMI6'].count['3'] || cur['UMI6'].count['3']
        tempObj['UMI6']['4'] = tempObj['UMI6']['4'] + cur['UMI6'].count['4'] || cur['UMI6'].count['4']
        tempObj['UMI6']['5'] = tempObj['UMI6']['5'] + cur['UMI6'].count['5'] || cur['UMI6'].count['5']

        acc['UMI1Avg'] = umiAvg(tempObj['UMI1'])
        acc['UMI2Avg'] = umiAvg(tempObj['UMI2'])
        acc['UMI3Avg'] = umiAvg(tempObj['UMI3'])
        acc['UMI4Avg'] = umiAvg(tempObj['UMI4'])
        acc['UMI5Avg'] = umiAvg(tempObj['UMI5'])
        acc['UMI6Avg'] = umiAvg(tempObj['UMI6'])

        acc['length'] = acc['length'] + 1 || 1
        return acc
      }, {})
      // console.log(obj)
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
