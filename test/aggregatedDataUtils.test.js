/* global describe, it */

import assert from 'assert'
import * as utils from '../src/utils/aggregatedDataUtils'

describe('filterbByEnrolment', () => {
  it('takes an array of sections and returns the sections with enrolment between lower and upper parameters', () => {
    let input = [
      { enrolment: 0 },
      { enrolment: 10 },
      { enrolment: 12 },
      { enrolment: 24 }
    ]
    let output = [
      { enrolment: 10 },
      { enrolment: 12 }
    ]
    assert.deepEqual(utils.filterByEnrolment(10, 12)(input), output)
  })
})

describe('calculateEnrolment', () => {
  it('takes an array of sections and returns the sum of the enrolments', () => {
    let input = [
      { enrolment: 25 },
      { enrolment: 25 },
      { enrolment: 25 }
    ]
    let output = 75
    assert.deepEqual(utils.calculateEnrolment(input), output)
  })
})
