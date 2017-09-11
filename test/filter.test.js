import assert from 'assert'
import * as filter from '../src/utils/filter'

describe('filterByYear', () => {
    it('takes a year and filters an array of objects to return only objects with that year', () => {
        const input = [
            {term: '2016W1', courseNum: 'LFSLC 100 001'},
            {term: '2017W1', courseNum: 'LFSLC 100 001'},
            {term: '2017W1', courseNum: 'LFSLC 100 001'},
            {term: '2017W1', courseNum: 'LFSLC 100 001'},
            {term: '2019W1', courseNum: 'LFSLC 100 001'},
        ]
        const output2017 = [
            {term: '2017W1', courseNum: 'LFSLC 100 001'},
            {term: '2017W1', courseNum: 'LFSLC 100 001'},
            {term: '2017W1', courseNum: 'LFSLC 100 001'},
        ]
        const filterBy2017 = filter.byYear(2017)
        assert.deepEqual(filterBy2017(input), output2017)

        const output2016 = [
            {term: '2016W1', courseNum: 'LFSLC 100 001'}
        ]
        const filterBy2016 = filter.byYear(2016)
        assert.deepEqual(filterBy2016(input), output2016)

        const filterBy2020 = filter.byYear(2020)
        assert.deepEqual(filterBy2020(input), [])
    })
})
describe('filterByTerm', () => {
    it('takes a term and filters an array of objects to retunr only objects with that term', () => {
        const input = [
            {term: '2016W1', courseNum: 'LFSLC 100 001'},
            {term: '2017W2', courseNum: 'LFSLC 100 001'},
            {term: '2017S1', courseNum: 'LFSLC 100 001'},
            {term: '2017S1', courseNum: 'LFSLC 100 001'},
            {term: '2019S2', courseNum: 'LFSLC 100 001'},
        ]
        const outputS1 = [
            {term: '2017S1', courseNum: 'LFSLC 100 001'},
            {term: '2017S1', courseNum: 'LFSLC 100 001'}
        ]
        const filterByS1 = filter.byTerm('S1')
        assert.deepEqual(filterByS1(input), outputS1)
    })
})

