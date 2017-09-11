import assert from 'assert'
import * as c from '../src/utils/calculate'

describe('calculateAvg', () => {
    it('takes an array and returns the average of that array', () => {
        assert.deepEqual(3, c.calculateAvg([1,2,3,4,5]))
        assert.deepEqual(1, c.calculateAvg([1]))
    })
})