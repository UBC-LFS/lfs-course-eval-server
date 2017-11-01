import { readDataByYear } from '../service/dbService.js'
import R from 'ramda'
import * as calculate from '../utils/calculate'
import { writeToDB } from '../service/dbService'
 
// readDataByYear('2016', 'UMIInstructor', (res) => {
//     const result = aggregateUMIInstructor(res)
//     writeToDB(result, 'UMIInstructor')
// })

// const aggregateUMIInstructor = (data) => {
//     const byInstructor = R.groupBy((course) => course.PUID)
//     const result = R.toPairs(byInstructor(data))
//     const finalArray = []
//     for (var i = 0; i < result.length; i++) {
//         const finalObj = {}
//         finalObj[result[i][0]] = result[i][1]
//         finalArray.push(finalObj)
//     }
//     return finalArray
// }

// export {
//     aggregateUMIInstructor
// }