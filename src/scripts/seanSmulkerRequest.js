import * as getFromCSV from './scriptUtils/getFromCSV'
import R from 'ramda'
import readCSV from '../service/readCSV'
import * as filter from '../utils/filterCSV'

// for Sean Smulker, tight deadline, will refactor
readCSV('../scripts/source/rawDataAll.csv', (csv) => {
  const UMI1Arr = filter.invalidResults(csv.map(x => getFromCSV.getUMI1(x)))
  const UMI2Arr = filter.invalidResults(csv.map(x => getFromCSV.getUMI2(x)))
  const UMI3Arr = filter.invalidResults(csv.map(x => getFromCSV.getUMI3(x)))
  const UMI4Arr = filter.invalidResults(csv.map(x => getFromCSV.getUMI4(x)))
  const UMI5Arr = filter.invalidResults(csv.map(x => getFromCSV.getUMI5(x)))
  const UMI6Arr = filter.invalidResults(csv.map(x => getFromCSV.getUMI6(x)))

  // const UMI1Arr = filter.invalidResults(csv.map(x => getFromCSV.getUMI1(x)))
  // const UMI2Arr = filter.invalidResults(csv.map(x => getFromCSV.getUMI2(x)))
  // const UMI3Arr = filter.invalidResults(csv.map(x => getFromCSV.getUMI3(x)))
  // const UMI4Arr = filter.invalidResults(csv.map(x => getFromCSV.getUMI4(x)))
  // const UMI5Arr = filter.invalidResults(csv.map(x => getFromCSV.getUMI5(x)))
  // const UMI6Arr = filter.invalidResults(csv.map(x => getFromCSV.getUMI6(x)))

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
  const filterAPBI = filter.byDept('APBI')

  const APBIUMI1 = filter.invalidResults(filterAPBI(csv).map(x => getFromCSV.getUMI1(x)))
  const APBIUMI2 = filter.invalidResults(filterAPBI(csv).map(x => getFromCSV.getUMI2(x)))
  const APBIUMI3 = filter.invalidResults(filterAPBI(csv).map(x => getFromCSV.getUMI3(x)))
  const APBIUMI4 = filter.invalidResults(filterAPBI(csv).map(x => getFromCSV.getUMI4(x)))
  const APBIUMI5 = filter.invalidResults(filterAPBI(csv).map(x => getFromCSV.getUMI5(x)))
  const APBIUMI6 = filter.invalidResults(filterAPBI(csv).map(x => getFromCSV.getUMI6(x)))

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
  const filterFOOD = filter.byDept('FOOD')

  const FOODUMI1 = filter.invalidResults(filterFOOD(csv).map(x => getFromCSV.getUMI1(x)))
  const FOODUMI2 = filter.invalidResults(filterFOOD(csv).map(x => getFromCSV.getUMI2(x)))
  const FOODUMI3 = filter.invalidResults(filterFOOD(csv).map(x => getFromCSV.getUMI3(x)))
  const FOODUMI4 = filter.invalidResults(filterFOOD(csv).map(x => getFromCSV.getUMI4(x)))
  const FOODUMI5 = filter.invalidResults(filterFOOD(csv).map(x => getFromCSV.getUMI5(x)))
  const FOODUMI6 = filter.invalidResults(filterFOOD(csv).map(x => getFromCSV.getUMI6(x)))

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
  const filterSOIL = filter.byDept('SOIL')

  const SOILUMI1 = filter.invalidResults(filterSOIL(csv).map(x => getFromCSV.getUMI1(x)))
  const SOILUMI2 = filter.invalidResults(filterSOIL(csv).map(x => getFromCSV.getUMI2(x)))
  const SOILUMI3 = filter.invalidResults(filterSOIL(csv).map(x => getFromCSV.getUMI3(x)))
  const SOILUMI4 = filter.invalidResults(filterSOIL(csv).map(x => getFromCSV.getUMI4(x)))
  const SOILUMI5 = filter.invalidResults(filterSOIL(csv).map(x => getFromCSV.getUMI5(x)))
  const SOILUMI6 = filter.invalidResults(filterSOIL(csv).map(x => getFromCSV.getUMI6(x)))

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
  const filterPLNT = filter.byDept('PLNT')

  const PLNTUMI1 = filter.invalidResults(filterPLNT(csv).map(x => getFromCSV.getUMI1(x)))
  const PLNTUMI2 = filter.invalidResults(filterPLNT(csv).map(x => getFromCSV.getUMI2(x)))
  const PLNTUMI3 = filter.invalidResults(filterPLNT(csv).map(x => getFromCSV.getUMI3(x)))
  const PLNTUMI4 = filter.invalidResults(filterPLNT(csv).map(x => getFromCSV.getUMI4(x)))
  const PLNTUMI5 = filter.invalidResults(filterPLNT(csv).map(x => getFromCSV.getUMI5(x)))
  const PLNTUMI6 = filter.invalidResults(filterPLNT(csv).map(x => getFromCSV.getUMI6(x)))

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
