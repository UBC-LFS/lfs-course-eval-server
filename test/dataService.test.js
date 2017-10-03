/* global describe, it */
import assert from 'assert'
import * as DS from '../src/service/dataService'

describe('filterDataByFilterSettings', () => {
  it('takes an object of filters and returns ', () => {

  })
})

describe('filterData', () => {
  it('creates a filter object according to the data in the mockAggregatedData', () => {
    const output = {
      years: [2016],
      terms: ['W1', 'W2'],
      courseLevels: [100],
      questionCodes: ['UMI1', 'UMI2', 'UMI3', 'UMI4', 'UMI5', 'UMI6'],
      depts: ['LFS']
    }
    return DS.filterData().then(result => assert.deepEqual(result, output))
  })
})
