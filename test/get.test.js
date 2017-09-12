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

describe('getArrayOfUmi', () => {
    it('takes an array of objects and returns the UMI values of the specified UMI', () => {
        const input = [
            {term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
            {term: '2017W2', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
            {term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
            {term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
            {term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
            {term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Alice Bob', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 }
        ]
        const outputUMI6 = [6,6,6,6,6,6]
        const getUMI6 = get.arrayOfUmi('UMI6')
        assert.deepEqual(getUMI6(input), outputUMI6)
        const outputUMI5 = [5,5,5,5,5,5]
        const getUMI5 = get.arrayOfUmi('UMI5')
        assert.deepEqual(getUMI5(input), outputUMI5)
    })
})