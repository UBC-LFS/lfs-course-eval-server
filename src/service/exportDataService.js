import * as db from './dbService'
import * as collection from '../utils/constants'

const dataForOptions = () => {
  return new Promise((resolve, reject) => {
    db.readData(collection.metaData, {}, res => {
      if (res) resolve(res)
      else reject(Error('db returned no result'))
    })
  })
}

export {
  dataForOptions
}
