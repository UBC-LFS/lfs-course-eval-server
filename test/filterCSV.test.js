/* global describe, it */
import * as filterCSV from '../src/scripts/scriptUtils/filterCSV'
import assert from 'assert'

describe('byDept', () => {
  it('takes an array of responses and only returns the specified dept', () => {
    let input = [
      {deptname: 'APBI'},
      {deptname: 'APBI'},
      {deptname: 'CPSC'},
      {deptname: 'CPSC'}
    ]
    let output = [
      {deptname: 'CPSC'},
      {deptname: 'CPSC'}
    ]
    assert.deepEqual(filterCSV.byDept('CPSC')(input), output)
    output = [
      {deptname: 'APBI'},
      {deptname: 'APBI'}
    ]
    assert.deepEqual(filterCSV.byDept('APBI')(input), output)
  })
})

describe('invalidResults', () => {
  it('takes an array of UMI results and returns only valid responses (between 1 and 5, inclusive)', () => {
    let input = [1, 2, 3, 4, 5, 6, 7, 0]
    let output = [1, 2, 3, 4, 5]
    assert.deepEqual(filterCSV.invalidResults(input), output)
  })
})

describe('byYear', () => {
  it('takes an array of courseval results and returns only the results with matching year', () => {
    let input = [
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2018SA'}
    ]
    let output = [
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'}
    ]
    assert.deepEqual(filterCSV.byYear(2017)(input), output)
  })
})
