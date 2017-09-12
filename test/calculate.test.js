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

describe('calculatePercentFavourable', () => {
    it('takes an array of numbers ranging from 1-5 and returns the percent of numbers greater than or equal to 4', () => {
        assert.deepEqual(0.5, calculate.percentFavourable([1,2,3,4,5,5]))
        assert.deepEqual(1, calculate.percentFavourable([4,5,5]))
        assert.deepEqual(0, calculate.percentFavourable([1,2,3]))
        assert.deepEqual(0, calculate.percentFavourable([]))
        assert.deepEqual(0.8, calculate.percentFavourable([4,4,4,4,1]))
        assert.deepEqual(0.2, calculate.percentFavourable([2,2,2,2,5]))
        assert.deepEqual(0.1, calculate.percentFavourable([2,2,1,2,3,4,3,3,3,2]))
    })
})