import { MongoClient } from 'mongodb'
import assert from 'assert'

const url = 'mongodb://localhost:27017/courseval'

const insertDocuments = (db, dataToWrite, src, cb) => {
  const collection = db.collection(src)
  collection.insertMany(dataToWrite, function (err, result) {
    assert.equal(err, null)
    assert.equal(dataToWrite.length, result.ops.length)
    cb(result)
  })
}

const writeToDB = (dataToWrite, src) => MongoClient.connect(url, (err, db) => {
  assert.equal(null, err)
  insertDocuments(db, dataToWrite, src, result => {
    db.close()
  })
})

const readData = (collectionName, conditions, cb) => MongoClient.connect(url, (err, db) => {
  assert.equal(null, err)
  const collection = db.collection(collectionName)
  collection.find(conditions).toArray((err, result) => {
    assert.equal(null, err)
    cb(result)
    db.close()
  })
})

const clearCollection = (name, cb) => MongoClient.connect(url, (err, db) => {
  assert.equal(null, err)
  const collection = db.collection(name)
  collection.remove({}, (err, result) => {
    assert.equal(null, err)
    db.close()
    cb()
  })
})

export {
    writeToDB,
    readData,
    clearCollection
}
