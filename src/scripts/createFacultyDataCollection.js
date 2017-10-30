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

const filterByDept = (dept, arr) => arr.filter(x => getFromCSV.getDept(x) === dept)

// for Sean Smulker

readCSV('rawDataAll.csv', (csv) => {
  const UMI1Arr = filterInvalidResults(csv.map(x => getFromCSV.getUMI1(x)))
  const UMI2Arr = filterInvalidResults(csv.map(x => getFromCSV.getUMI2(x)))
  const UMI3Arr = filterInvalidResults(csv.map(x => getFromCSV.getUMI3(x)))
  const UMI4Arr = filterInvalidResults(csv.map(x => getFromCSV.getUMI4(x)))
  const UMI5Arr = filterInvalidResults(csv.map(x => getFromCSV.getUMI5(x)))
  const UMI6Arr = filterInvalidResults(csv.map(x => getFromCSV.getUMI6(x)))

  // print UMI average
  console.log(
    'Faculty UMI1: ', R.mean(UMI1Arr) + '\n' +
    'Faculty UMI2: ', R.mean(UMI2Arr) + '\n' +
    'Faculty UMI3: ', R.mean(UMI3Arr) + '\n' +
    'Faculty UMI4: ', R.mean(UMI4Arr) + '\n' +
    'Faculty UMI5: ', R.mean(UMI5Arr) + '\n' +
    'Faculty UMI6: ', R.mean(UMI6Arr) + '\n' +
    'Number of Faculty Responses: ', UMI1Arr.length
  )
  
  // APBI
  const APBIUMI1 = filterInvalidResults(filterByDept('APBI', csv).map(x => getFromCSV.getUMI1(x)))
  const APBIUMI2 = filterInvalidResults(filterByDept('APBI', csv).map(x => getFromCSV.getUMI2(x)))
  const APBIUMI3 = filterInvalidResults(filterByDept('APBI', csv).map(x => getFromCSV.getUMI3(x)))
  const APBIUMI4 = filterInvalidResults(filterByDept('APBI', csv).map(x => getFromCSV.getUMI4(x)))
  const APBIUMI5 = filterInvalidResults(filterByDept('APBI', csv).map(x => getFromCSV.getUMI5(x)))
  const APBIUMI6 = filterInvalidResults(filterByDept('APBI', csv).map(x => getFromCSV.getUMI6(x)))

  console.log(
    'APBI UMI1: ', R.mean(APBIUMI1) + '\n' +
    'APBI UMI2: ', R.mean(APBIUMI2) + '\n' +
    'APBI UMI3: ', R.mean(APBIUMI3) + '\n' +
    'APBI UMI4: ', R.mean(APBIUMI4) + '\n' +
    'APBI UMI5: ', R.mean(APBIUMI5) + '\n' +
    'APBI UMI6: ', R.mean(APBIUMI6) + '\n' +
    'Number of APBI Responses: ', APBIUMI1.length
  )

  // FOOD
  const FOODUMI1 = filterInvalidResults(filterByDept('FOOD', csv).map(x => getFromCSV.getUMI1(x)))
  const FOODUMI2 = filterInvalidResults(filterByDept('FOOD', csv).map(x => getFromCSV.getUMI2(x)))
  const FOODUMI3 = filterInvalidResults(filterByDept('FOOD', csv).map(x => getFromCSV.getUMI3(x)))
  const FOODUMI4 = filterInvalidResults(filterByDept('FOOD', csv).map(x => getFromCSV.getUMI4(x)))
  const FOODUMI5 = filterInvalidResults(filterByDept('FOOD', csv).map(x => getFromCSV.getUMI5(x)))
  const FOODUMI6 = filterInvalidResults(filterByDept('FOOD', csv).map(x => getFromCSV.getUMI6(x)))

  console.log(
    'FOOD UMI1: ', R.mean(FOODUMI1) + '\n' +
    'FOOD UMI2: ', R.mean(FOODUMI2) + '\n' +
    'FOOD UMI3: ', R.mean(FOODUMI3) + '\n' +
    'FOOD UMI4: ', R.mean(FOODUMI4) + '\n' +
    'FOOD UMI5: ', R.mean(FOODUMI5) + '\n' +
    'FOOD UMI6: ', R.mean(FOODUMI6) + '\n' +
    'Number of FOOD Responses: ', FOODUMI1.length
  )
  
  // SOIL
  const SOILUMI1 = filterInvalidResults(filterByDept('SOIL', csv).map(x => getFromCSV.getUMI1(x)))
  const SOILUMI2 = filterInvalidResults(filterByDept('SOIL', csv).map(x => getFromCSV.getUMI2(x)))
  const SOILUMI3 = filterInvalidResults(filterByDept('SOIL', csv).map(x => getFromCSV.getUMI3(x)))
  const SOILUMI4 = filterInvalidResults(filterByDept('SOIL', csv).map(x => getFromCSV.getUMI4(x)))
  const SOILUMI5 = filterInvalidResults(filterByDept('SOIL', csv).map(x => getFromCSV.getUMI5(x)))
  const SOILUMI6 = filterInvalidResults(filterByDept('SOIL', csv).map(x => getFromCSV.getUMI6(x)))

  console.log(
    'SOIL UMI1: ', R.mean(SOILUMI1) + '\n' +
    'SOIL UMI2: ', R.mean(SOILUMI2) + '\n' +
    'SOIL UMI3: ', R.mean(SOILUMI3) + '\n' +
    'SOIL UMI4: ', R.mean(SOILUMI4) + '\n' +
    'SOIL UMI5: ', R.mean(SOILUMI5) + '\n' +
    'SOIL UMI6: ', R.mean(SOILUMI6) + '\n' +
    'Number of SOIL Responses: ', SOILUMI1.length
  )

  // PLNT
  const PLNTUMI1 = filterInvalidResults(filterByDept('PLNT', csv).map(x => getFromCSV.getUMI1(x)))
  const PLNTUMI2 = filterInvalidResults(filterByDept('PLNT', csv).map(x => getFromCSV.getUMI2(x)))
  const PLNTUMI3 = filterInvalidResults(filterByDept('PLNT', csv).map(x => getFromCSV.getUMI3(x)))
  const PLNTUMI4 = filterInvalidResults(filterByDept('PLNT', csv).map(x => getFromCSV.getUMI4(x)))
  const PLNTUMI5 = filterInvalidResults(filterByDept('PLNT', csv).map(x => getFromCSV.getUMI5(x)))
  const PLNTUMI6 = filterInvalidResults(filterByDept('PLNT', csv).map(x => getFromCSV.getUMI6(x)))

  console.log(
    'PLNT UMI1: ', R.mean(PLNTUMI1) + '\n' +
    'PLNT UMI2: ', R.mean(PLNTUMI2) + '\n' +
    'PLNT UMI3: ', R.mean(PLNTUMI3) + '\n' +
    'PLNT UMI4: ', R.mean(PLNTUMI4) + '\n' +
    'PLNT UMI5: ', R.mean(PLNTUMI5) + '\n' +
    'PLNT UMI6: ', R.mean(PLNTUMI6) + '\n' +
    'Number of PLNT Responses: ', PLNTUMI1.length
  )
})
