import R from 'ramda'
import readCSV from '../service/readCSV'
import * as getFromCSV from './scriptUtils/getFromCSV'
import assert from 'assert'

readCSV('../scripts/source/rawDataAll.csv', csv => {
  const noDeptMatch = csv.filter(ev => {
    return getFromCSV.getDept(ev) !== getFromCSV.getCourse(ev).split(' ')[0]
  })
  console.log(noDeptMatch)
})
