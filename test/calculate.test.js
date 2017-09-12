import assert from 'assert'
import * as calculate from '../src/utils/calculate'

describe('calculateAvg', () => {
    it('takes an array and returns the average of that array', () => {
        assert.deepEqual(3, calculate.avg([1,2,3,4,5]))
        assert.deepEqual(1, calculate.avg([1]))
    })
})

describe('calculateMedian', () => {
    it('takes an array and returns the median of that array', () => {
        assert.deepEqual(3, calculate.median([1,2,3,4,5]))
        assert.deepEqual(3, calculate.median([1,3,4]))
        assert.deepEqual(3.5, calculate.median([1,3,4,5]))
        assert.deepEqual(3.5, calculate.median([1,3,4,57]))
        assert.deepEqual(4, calculate.median([1,3,4,5,7]))
    })
})

