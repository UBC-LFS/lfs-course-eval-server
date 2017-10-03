import { MongoClient } from 'mongodb'
import assert from 'assert'

const url = 'mongodb://localhost:27017/courseval'

const insertDocuments = (db, dataToWrite, cb) => {
  const collection = db.collection('aggregatedData')
  collection.insertMany(dataToWrite, function (err, result) {
    assert.equal(err, null)
    assert.equal(dataToWrite.length, result.ops.length)
    console.log('Inserted successfully')
    cb(result)
  })
}

const writeToDB = (dataToWrite) => MongoClient.connect(url, (err, db) => {
  assert.equal(null, err)
  console.log('connected successfully!')
  insertDocuments(db, dataToWrite, () => {
    db.close()
  })
  db.close()
})

export default writeToDB
