/* global describe, it */
import * as filterCSV from '../src/utils/filterCSV'
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