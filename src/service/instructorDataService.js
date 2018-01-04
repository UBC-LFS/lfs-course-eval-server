import * as db from './dbService'
import { removeIDs } from '../utils/filter'
import * as collection from '../utils/constants'

const dataForOverview = instructor => {
  const condition = { 'instructorName': instructor }

  return new Promise((resolve, reject) => {
    db.readData(collection.overallInstructor, condition, data => {
      if (data) resolve(removeIDs(data))
      else reject(Error('db returned no result'))
    })
  })
}

export {
    dataForOverview
}
