import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/courseval'

MongoClient.connect(url, (err, db) => {
  if (err) throw err
  console.log('db created!')
  db.close()
})

