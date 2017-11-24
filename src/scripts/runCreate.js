import { outputAggregatedData } from './createAggregatedDataCollection'
import { outputEnrolmentTrendData } from './createEnrolmentTrendCollection'
import { outputFacultyDeptData } from './createFacultyAndDeptDataCollection'

outputAggregatedData(() => {
  outputEnrolmentTrendData()
  outputFacultyDeptData()
})
