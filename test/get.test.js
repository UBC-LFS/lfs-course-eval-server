import assert from 'assert'
import * as get from '../src/utils/get'

describe('getSliceYear', () => {
    it('gets the year from the specified term', () => {
        assert.deepEqual(get.sliceYear('2016W1'), 2016)
        assert.deepEqual(get.sliceYear('2017W1'), 2017)
    })
})

describe('getSliceTerm', () => {
    it('gets the year from the specified term', () => {
        assert.deepEqual(get.sliceTerm('2016W1'), 'W1')
        assert.deepEqual(get.sliceTerm('2017W2'), 'W2')
    })
})