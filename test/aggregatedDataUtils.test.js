/* global describe, it */

import assert from 'assert'
import * as utils from '../src/utils/aggregatedDataUtils'

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
