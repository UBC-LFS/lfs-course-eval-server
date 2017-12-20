import { outputAggregatedData } from './createAggregatedDataCollection'
import { outputEnrolmentTrendData } from './createEnrolmentTrendCollection'
import { outputFacultyDeptData } from './createFacultyAndDeptDataCollection'
import { outputOverallInstructorData } from './createOverallInstructorCollection'
import { outputUMIInstructor } from './createUMIInstructorCollection'
import { outputCoursePerformance } from './createCoursePerformanceCollection'
import { outputMetaData } from './createMetaData'

// the nested callbacks are necessary because the inner functions rely on the files that the outer function writes
outputAggregatedData(() => {
  outputEnrolmentTrendData()
  outputOverallInstructorData()
  outputUMIInstructor(() => {
    outputFacultyDeptData(() => {
      outputCoursePerformance(() =>
        console.log('All files created successfully! Now run the writeToMongo.js file to write to Mongo!'))
    })
  })
  outputMetaData()
})
