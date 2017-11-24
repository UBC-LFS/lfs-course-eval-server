import { readDataByYear } from '../service/dbService'
import { sumCount, filterByEnrolment } from './scriptUtils/aggDataUtil'
import { umiAvg, dispersionIndex } from '../utils/calculate'

const umi6AvgByClassSize = (data) => {
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
    console.log(umiAvg(sumCount(arr.map(section => section.UMI6.count))), dispersionIndex(sumCount(arr.map(section => section.UMI6.count))), arr.length)
  )
}

readDataByYear('2016', 'aggregatedData', (data) => {
  umi6AvgByClassSize(data)
})
