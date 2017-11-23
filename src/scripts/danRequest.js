import { readDataByYear } from '../service/dbService'
import { sumCount } from './scriptUtils/utilCSV'
import { umiAvg, dispersionIndex } from '../utils/calculate'

readDataByYear('2016', 'aggregatedData', (aggregatedData) => {
  const above150Enrolment = aggregatedData.filter(section => section.enrolment > 150)
  const justUMI6Counts = above150Enrolment.map(x => x.UMI6.count)
  // console.log(justUMI6Counts)
  const sumOfUMI6Counts = sumCount(justUMI6Counts)
  // console.log(sumOfUMI6Counts)

  console.log(umiAvg(sumOfUMI6Counts), dispersionIndex(sumOfUMI6Counts))
})
