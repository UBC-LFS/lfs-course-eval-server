import { readDataByYear } from '../service/dbService'
import { sumCount, filterByEnrolment } from './scriptUtils/aggDataUtil'
import { umiAvg, dispersionIndex } from '../utils/calculate'
import R from 'ramda'

const byClassSize = data => {
  const tenAndUnder = filterByEnrolment(0, 10)(data)
  const tenToTwenty = filterByEnrolment(11, 20)(data)
  const twentyToThirty = filterByEnrolment(21, 30)(data)
  const thirtyToFourty = filterByEnrolment(31, 40)(data)
  const fourtyToFifty = filterByEnrolment(41, 50)(data)
  const fiftyToSixty = filterByEnrolment(51, 60)(data)
  const sixtyToSeventy = filterByEnrolment(61, 70)(data)
  const seventyToEighty = filterByEnrolment(71, 80)(data)
  const eightyToNinety = filterByEnrolment(81, 90)(data)
  const ninetyToOneHundred = filterByEnrolment(91, 100)(data)
  const over100 = filterByEnrolment(101, 10000)(data)

  const dataArray = [tenAndUnder, tenToTwenty, twentyToThirty, thirtyToFourty, fourtyToFifty, fiftyToSixty, sixtyToSeventy, seventyToEighty, eightyToNinety, ninetyToOneHundred, over100]

  dataArray.map(arr =>
    console.log(
      arr.length
      // 'UMI6 average: ' + umiAvg(sumCount(arr.map(section => section.UMI6.count))),
      // 'Dispersion Index: ' + dispersionIndex(sumCount(arr.map(section => section.UMI6.count))),
      // 'Number of Courses: ' + arr.length
    )
  )
}

const byDept = data => {
  const depts = R.uniq(data.map(section => section.dept))
  const groupedByDepts = depts.map(dept => data.filter(section => section.dept === dept))
  const sumCountByDept = groupedByDepts.map(aGroup => ({
    avg: umiAvg(sumCount(aGroup.map(x => x.UMI6.count))),
    dispersion: dispersionIndex(sumCount(aGroup.map(x => x.UMI6.count))),
    length: aGroup.length,
    dept: aGroup[0].dept
  })).sort((a, b) => a.avg - b.avg)
  console.log(sumCountByDept)
}

readDataByYear('2016', 'aggregatedData', (data) => {
  // byClassSize(data)
  byDept(data)
})
