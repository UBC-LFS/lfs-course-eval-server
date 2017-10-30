import fs from 'fs'
import parse from 'csv-parse'
import path from 'path'
import * as getFromCSV from './scriptUtils/getFromCSV'

const readCSV = (filename, callback) => {
  const parser = parse({ delimiter: ',', columns: true, relax: true, auto_parse: true }, (
    err, data) => {
    if (err) throw err
    callback(data)
  })
  fs.createReadStream(path.join(__dirname, '/source/', filename)).pipe(parser)
}

readCSV('rawDataAll.csv', (csv) => {
  const UMI1Arr = csv.map(x => getFromCSV.getUMI1(x))
  console.log(UMI1Arr)
})
