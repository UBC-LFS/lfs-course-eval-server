import R from 'ramda'
import readCSV from '../service/readCSV'
import * as getFromCSV from './scriptUtils/getFromCSV'
import assert from 'assert'

readCSV('../scripts/source/course_eval_enrollments-2009-2017SA.csv', csv => {
  const noDeptMatch = csv.filter(ev => {
    return getFromCSV.getDept(ev) !== getFromCSV.getCourse(ev).split(' ')[0]
  })
  console.log(noDeptMatch.filter(x => x.period === '2015W'))
  console.log(noDeptMatch.length)
  const incorrectPeriods = R.uniq(noDeptMatch.map(x => x.period))
  console.log(incorrectPeriods)
})