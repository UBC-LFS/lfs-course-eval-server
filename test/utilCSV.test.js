/* global describe, it */
import assert from 'assert'
import { sumCount } from '../src/scripts/scriptUtils/aggDataUtil'

describe('sumCount', () => {
  it('takes an array of counts and returns the sum of that array', () => {
    let input = [
      { '1': 0, '2': 2, '3': 8, '4': 29, '5': 29 }
    ]
    let output = { '1': 0, '2': 2, '3': 8, '4': 29, '5': 29 }
    assert.deepEqual(sumCount(input), output)

    input = [
      { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 },
      { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 }
    ]
    output = { '1': 2, '2': 4, '3': 6, '4': 8, '5': 10 }
    assert.deepEqual(sumCount(input), output)
    
    input = [
      { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 },
      { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 },
      { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 }
    ]
    output = { '1': 3, '2': 6, '3': 9, '4': 12, '5': 15 }
    assert.deepEqual(sumCount(input), output)
  })

})
