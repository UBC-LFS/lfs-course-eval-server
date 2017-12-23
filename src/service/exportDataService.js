import * as db from './dbService'
import * as collection from '../utils/constants'
import {
  standardDeviation,
  percentFavourable,
  dispersionIndex,
  sumCount,
  expandCount,
  umiAvg
} from '../utils/calculate'
import { removeIDs } from '../utils/filter'

const dataForOptions = () => {
  return new Promise((resolve, reject) => {
    db.readData(collection.metaData, {}, res => {
      if (res) resolve(removeIDs(res))
      else reject(Error('db returned no result'))
    })
  })
}

const dataForStats = ({fromYear, toYear, dept}) => {
  console.log('in dataForStats')
  let conditions = { year: { $gte: Number(fromYear), $lte: Number(toYear) }, dept: dept }
  if (dept === 'all') delete conditions.dept

  const analyzeAggregatedData = data => {
    const UMI6Count = sumCount(data.map(section => section.UMI6.count))
    return {
      standardDeviation: standardDeviation(expandCount(UMI6Count)),
      percentFavourable: percentFavourable(UMI6Count),
      dispersionIndex: dispersionIndex(UMI6Count),
      average: umiAvg(UMI6Count),
      length: data.length
    }
  }

  return new Promise((resolve, reject) => {
    db.readData(collection.aggregatedData, conditions, data => {
      if (data) resolve(analyzeAggregatedData(removeIDs(data)))
      else reject(Error('db returned no result'))
    })
  })
}

export {
  dataForOptions,
  dataForStats
}
