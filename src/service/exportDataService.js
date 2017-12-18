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

const dataForOptions = () => {
  return new Promise((resolve, reject) => {
    db.readData(collection.metaData, {}, res => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}

const dataForStats = (fromYear, toYear, dept) => {
  let conditions = { year: { $gte: Number(fromYear), $lte: Number(toYear) }, dept: dept }
  if (dept === 'all') conditions = { year: { $gte: Number(fromYear), $lte: Number(toYear) } }
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
    db.readData(collection.aggregatedData, conditions, (data) => {
      if (data) resolve(analyzeAggregatedData(data))
      else reject(Error('db returned no result'))
    })
  })
}

export {
  dataForOptions,
  dataForStats
}
