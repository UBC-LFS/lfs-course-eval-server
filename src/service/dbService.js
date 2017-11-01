import { MongoClient } from 'mongodb'
import assert from 'assert'

const url = 'mongodb://localhost:27017/courseval'

const insertDocuments = (db, dataToWrite, src, cb) => {
  const collection = db.collection(src)
  collection.insertMany(dataToWrite, function (err, result) {
    assert.equal(err, null)
    assert.equal(dataToWrite.length, result.ops.length)
    console.log('Inserted successfully')
    cb(result)
  })
}

const writeToDB = (dataToWrite, src) => MongoClient.connect(url, (err, db) => {
  assert.equal(null, err)
  console.log('connected successfully!')
  insertDocuments(db, dataToWrite, src, () => {
    db.close()
  })
  db.close()
})

const readDataByYear = (year, name, cb) => MongoClient.connect(url, (err, db) => {
  assert.equal(null, err)
  const collection = db.collection(name)
  collection.find().toArray((err, result) => {
    assert.equal(null, err)
    cb(result)
    db.close()
  })
})

const clearCollection = (name) => MongoClient.connect(url, (err, db) => {
  assert.equal(null, err)
  const collection = db.collection(name)
  collection.remove({}, (err, result) => {
    assert.equal(null, err)
    db.close()
  })
})

export {
    writeToDB,
    readDataByYear,
    clearCollection
}
