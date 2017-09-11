import assert from 'assert'
import * as calculate from '../src/utils/calculate'

describe('calculateAvg', () => {
    it('takes an array and returns the average of that array', () => {
        assert.deepEqual(3, calculate.avg([1,2,3,4,5]))
        assert.deepEqual(1, calculate.avg([1]))
    })
})

