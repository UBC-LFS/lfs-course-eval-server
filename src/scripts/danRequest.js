import R from 'ramda'
import { readDataByYear } from '../service/dbService'
import { filterByYears } from './scriptUtils/aggDataUtil'
import { umiAvg, dispersionIndex, standardDeviation, expandCount, sumCount } from '../utils/calculate'

readDataByYear('2016', 'aggregatedData', (aggregatedData) => {
  // const between2013And2016 = filterByYears(2014, 2016)(aggregatedData)
  const between2013And2016 = aggregatedData
  console.log('there are ', between2013And2016.length, 'sections between 2013 and 2016')

  const UMI6Counts = sumCount(between2013And2016.map(section => section.UMI6.count))

  const expandedUMI6 = expandCount(UMI6Counts)
  console.log('there are ', expandedUMI6.length, 'UMI6 evaluations between 2013 and 2016')

  const UMI6Avg = umiAvg(UMI6Counts)

  const UMI6StdDev = standardDeviation(expandedUMI6)

  console.log('the UMI6 average is ', UMI6Avg, 'and the StdDev is ', UMI6StdDev)
})
