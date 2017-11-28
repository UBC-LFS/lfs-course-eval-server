import { outputAggregatedData } from './createAggregatedDataCollection'
import { outputEnrolmentTrendData } from './createEnrolmentTrendCollection'
import { outputFacultyDeptData } from './createFacultyAndDeptDataCollection'
import { outputOverallInstructorData } from './createOverallInstructorCollection'
import { outputUMIInstructor } from './createUMIInstructorCollection'
import { outputCoursePerformance } from './createCoursePerformanceCollection'

outputAggregatedData(() => {
  outputEnrolmentTrendData()
  outputOverallInstructorData()
  outputUMIInstructor(() => {
    outputFacultyDeptData(() => {
      outputCoursePerformance()
    })
  })
})
