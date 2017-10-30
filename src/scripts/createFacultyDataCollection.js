import fs from 'fs'
import parse from 'csv-parse'
import path from 'path'
import * as getFromCSV from './scriptUtils/getFromCSV'
import R from 'ramda'

const readCSV = (filename, callback) => {
  const parser = parse({ delimiter: ',', columns: true, relax: true, auto_parse: true }, (
    err, data) => {
    if (err) throw err
    callback(data)
  })
  fs.createReadStream(path.join(__dirname, '/source/', filename)).pipe(parser)
}

const filterInvalidResults = (arr) => arr.filter(x => x === 1 || x === 2 || x === 3 || x === 4 || x === 5)

readCSV('rawDataAll.csv', (csv) => {
  const UMI1Arr = filterInvalidResults(csv.map(x => getFromCSV.getUMI1(x)))
  const UMI2Arr = filterInvalidResults(csv.map(x => getFromCSV.getUMI2(x)))
  const UMI3Arr = filterInvalidResults(csv.map(x => getFromCSV.getUMI3(x)))
  const UMI4Arr = filterInvalidResults(csv.map(x => getFromCSV.getUMI4(x)))
  const UMI5Arr = filterInvalidResults(csv.map(x => getFromCSV.getUMI5(x)))
  const UMI6Arr = filterInvalidResults(csv.map(x => getFromCSV.getUMI6(x)))

  // print UMI average
  console.log(
    'UMI1: ', R.mean(UMI1Arr),
    'UMI2: ', R.mean(UMI2Arr),
    'UMI3: ', R.mean(UMI3Arr),
    'UMI4: ', R.mean(UMI4Arr),
    'UMI5: ', R.mean(UMI5Arr),
    'UMI6: ', R.mean(UMI6Arr)
  )

})
