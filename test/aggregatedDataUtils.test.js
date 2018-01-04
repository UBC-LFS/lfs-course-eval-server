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

    output = [
      { enrolment: 24 }
    ]
    assert.deepEqual(utils.filterByEnrolment(24, 100)(input), output)

    output = []
    assert.deepEqual(utils.filterByEnrolment(25, 100)(input), output)
  })
})

describe('filterByYears', () => {
  it('takes an array of sections and returns the sections filtered by specified by start and end years', () => {
    let input = [
      { year: 2000 },
      { year: 2001 },
      { year: 2002 },
      { year: 2003 },
      { year: 2004 }
    ]
    let output = [
      { year: 2000 }
    ]
    assert.deepEqual(utils.filterByYears(2000, 2000)(input), output)

    output = [
      { year: 2003 },
      { year: 2004 }
    ]
    assert.deepEqual(utils.filterByYears(2003, 2004)(input), output)

    output = [
      { year: 2000 },
      { year: 2001 },
      { year: 2002 },
      { year: 2003 },
      { year: 2004 }
    ]
    assert.deepEqual(utils.filterByYears(2000, 2004)(input), output)
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
