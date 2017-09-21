import assert from 'assert'
import * as filter from '../src/utils/filter'
import R from 'ramda'

describe('filterByYear', () => {
    it('takes a year and filters an array of objects to return only objects with that year', () => {
        const input = [
            { term: '2016W1', courseNum: 'LFSLC 100 001' },
            { term: '2017W1', courseNum: 'LFSLC 100 001' },
            { term: '2017W1', courseNum: 'LFSLC 100 001' },
            { term: '2017W1', courseNum: 'LFSLC 100 001' },
            { term: '2019W1', courseNum: 'LFSLC 100 001' },
        ]
        const output2017 = [
            { term: '2017W1', courseNum: 'LFSLC 100 001' },
            { term: '2017W1', courseNum: 'LFSLC 100 001' },
            { term: '2017W1', courseNum: 'LFSLC 100 001' },
        ]
        const filterBy2017 = filter.byYear(2017)
        assert.deepEqual(filterBy2017(input), output2017)

        const output2016 = [
            { term: '2016W1', courseNum: 'LFSLC 100 001' }
        ]
        const filterBy2016 = filter.byYear(2016)
        assert.deepEqual(filterBy2016(input), output2016)

        const filterBy2020 = filter.byYear(2020)
        assert.deepEqual(filterBy2020(input), [])
    })
})
describe('filterByTerm', () => {
    it('takes a term and filters an array of objects to return only objects with that term', () => {
        const input = [
            { term: '2016W1', courseNum: 'LFSLC 100 001' },
            { term: '2017W2', courseNum: 'LFSLC 100 001' },
            { term: '2017S1', courseNum: 'LFSLC 100 001' },
            { term: '2017S1', courseNum: 'LFSLC 100 001' },
            { term: '2019S2', courseNum: 'LFSLC 100 001' },
        ]
        const outputS1 = [
            { term: '2017S1', courseNum: 'LFSLC 100 001' },
            { term: '2017S1', courseNum: 'LFSLC 100 001' }
        ]
        const filterByS1 = filter.byTerm('S1')
        assert.deepEqual(filterByS1(input), outputS1)

        const filterByW1 = filter.byTerm('W1')
        assert.deepEqual(filterByW1(input), [{ term: '2016W1', courseNum: 'LFSLC 100 001' }])

        const filterByWA = filter.byTerm('WA')
        assert.deepEqual(filterByWA(input), [])
    })
})
describe('filterByInstructor', () => {
    it('takes an instructor and filters an array of objects to return only objects with that instructor', () => {
        const input = [
            { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', id: 'ABCDEFGABEGDF' },
            { term: '2017W2', courseNum: 'LFSLC 100 001', instructor: 'John Doe', id: 'ABCDEFGABEGDF' },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', id: 'ABCDEFGABEGDF' },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', id: '0987654321' },
            { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', id: '0987654321' },
            { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Alice Bob', id: '1234567ABC' }
        ]
        const outputJohnDoe = [
            { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', id: 'ABCDEFGABEGDF' },
            { term: '2017W2', courseNum: 'LFSLC 100 001', instructor: 'John Doe', id: 'ABCDEFGABEGDF' },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', id: 'ABCDEFGABEGDF' }
        ]
        const filterJohnDoe = filter.byInstructor('ABCDEFGABEGDF')
        assert.deepEqual(filterJohnDoe(input), outputJohnDoe)

        const outputAliceBob = [{ term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Alice Bob', id: '1234567ABC' }]
        const filterAliceBob = filter.byInstructor('1234567ABC')
        assert.deepEqual(filterAliceBob(input), outputAliceBob)

        const filterJustinLee = filter.byInstructor('AB1')
        assert.deepEqual(filterJustinLee(input), [])
    })
})
describe('filterByDept', () => {
    it('takes a dept and filters an array of objects to return only objects with that dept', () => {
        const input = [
            { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'APBI' },
            { term: '2017W2', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'APBI' },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'LFS' },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS' },
            { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS' },
            { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Alice Bob', deptName: 'APBI' }
        ]
        const outputAPBI = [
            { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'APBI' },
            { term: '2017W2', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'APBI' },
            { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Alice Bob', deptName: 'APBI' }
        ]
        const filterByAPBI = filter.byDept('APBI')
        assert.deepEqual(filterByAPBI(input), outputAPBI)

        const outputLFS = [
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'LFS' },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS' },
            { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS' }
        ]
        const filterByLFS = filter.byDept('LFS')
        assert.deepEqual(filterByLFS(input), outputLFS)
    })
})
describe('filterByYearAndTerm', () => {
    it('takes a year and term and filters an array of objects to return only objects with that year and term', () => {
        const input = [
            { term: '2016W1', courseNum: 'LFSLC 100 001' },
            { term: '2016W1', courseNum: 'LFSLC 200 001' },
            { term: '2016W1', courseNum: 'LFSLC 300 001' },
            { term: '2017W2', courseNum: 'LFSLC 100 001' },
            { term: '2017S1', courseNum: 'LFSLC 100 001' },
            { term: '2017S1', courseNum: 'LFSLC 100 001' },
            { term: '2019S2', courseNum: 'LFSLC 100 001' },
        ]
        const output = [
            { term: '2016W1', courseNum: 'LFSLC 100 001' },
            { term: '2016W1', courseNum: 'LFSLC 200 001' },
            { term: '2016W1', courseNum: 'LFSLC 300 001' }
        ]
        const filter2016W1 = filter.byYearAndTerm(2016, 'W1')
        assert.deepEqual(filter2016W1(input), output)
        const filter2017W2 = filter.byYearAndTerm(2017, 'W2')
        assert.deepEqual(filter2017W2(input), [{ term: '2017W2', courseNum: 'LFSLC 100 001' }])

        const filterBy2020W1 = filter.byYearAndTerm(2020, 'W1')
        assert.deepEqual(filterBy2020W1(input), [])
    })
})
describe('filterByCourseNum', () => {
    it('takes an array of objects and returns only objects that contain the specified course num', () => {
        const input = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI' },
            { term: '2017W2', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI' },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'LFS' },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS' },
            { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS' },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI' }
        ]
        const output = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI' },
            { term: '2017W2', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI' },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI' }
        ]
        const filterByLFSLC200001 = filter.byCourseNum('LFSLC 200 001')
        assert.deepEqual(filterByLFSLC200001(input), output)
    })
})
describe('filterByMany', () => {
    it('takes an arbitrary length of filters and returns thoes filters piped', () => {
        const input = [
            { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'APBI' },
            { term: '2017W2', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'APBI' },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'LFS' },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS' },
            { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS' },
            { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Alice Bob', deptName: 'APBI' }
        ]
        const output2017LFS = [
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'LFS' },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS' },
        ]
        const filterByYear2017AndLFS = R.pipe(filter.byYear(2017), filter.byDept('LFS'))
        assert.deepEqual(filterByYear2017AndLFS(input), output2017LFS)

        const filterByYear2017S1 = R.pipe(filter.byYear(2017), filter.byTerm('S1'))
        assert.deepEqual(filterByYear2017AndLFS(input), output2017LFS)
    })
})
describe('filterByClassSize', () => {
    it('can handle empty array', () => {
        let input = []
        const filterByClassSize = filter.byClassSize(2, 6)
        assert.deepEqual(filterByClassSize(input), [])
    })
    it('takes as input a min and max and returns only objects with classSize greater than or equal to min, and less than or equal to max', () => {
        let input = [
            { classSize: 0 },
            { classSize: 1 },
            { classSize: 2 },
            { classSize: 3 },
            { classSize: 4 },
            { classSize: 5 },
            { classSize: 6 },
            { classSize: 7 },
            { classSize: 8 },
            { classSize: 9 },
            { classSize: 10 },
        ]
        let output = [
            { classSize: 4 },
            { classSize: 5 },
            { classSize: 6 }
        ]
        const filterByClassSizeGreaterThan3AndLessThan7 = filter.byClassSize(4, 6)
        assert.deepEqual(filterByClassSizeGreaterThan3AndLessThan7(input), output)
        const filterByClassSizeGreaterThan0AndLessThan5 = filter.byClassSize(1, 4)
        assert.deepEqual(filterByClassSizeGreaterThan0AndLessThan5(input), [{ classSize: 1 }, { classSize: 2 }, { classSize: 3 }, { classSize: 4 }])
        // should return empty array for impossible inputs
        const filterImpossibleRange = filter.byClassSize(7, 3)
        assert.deepEqual(filterImpossibleRange(input), [])
        const filterSingleSize = filter.byClassSize(5, 5)
        assert.deepEqual(filterSingleSize(input), [{ classSize: 5 }])
    })
    it('takes as complex input, filters by class size, and return the filtered dataset containing all fields', () => {
        let input1 = [
            { "instructor": "'John Doe'", "courseNum": "LFSLC 100 001", "UMI6Avg": 4, "UMI6Dispersion": 0.2, "UMI6PercentFavourable": 90, "classSize": 50, "percentResponses": "30%" },
            { "instructor": "'John Doe'", "courseNum": "LFSLC 100 001", "UMI6Avg": 3, "UMI6Dispersion": 0.2, "UMI6PercentFavourable": 90, "classSize": 20, "percentResponses": "30%" },
            { "instructor": "'John Doe'", "courseNum": "LFSLC 100 001", "UMI6Avg": 2, "UMI6Dispersion": 0.2, "UMI6PercentFavourable": 90, "classSize": 90, "percentResponses": "30%" }
        ]
        let output1 = [
            { "instructor": "'John Doe'", "courseNum": "LFSLC 100 001", "UMI6Avg": 4, "UMI6Dispersion": 0.2, "UMI6PercentFavourable": 90, "classSize": 50, "percentResponses": "30%" },
            { "instructor": "'John Doe'", "courseNum": "LFSLC 100 001", "UMI6Avg": 3, "UMI6Dispersion": 0.2, "UMI6PercentFavourable": 90, "classSize": 20, "percentResponses": "30%" },
        ]
        const filterClassSizeComplexDataset = filter.byClassSize(20, 50)
        assert.deepEqual(filterClassSizeComplexDataset(input1), output1)
    })
})
describe('filterByToggle', () => {
    it('can handle empty array', () => {
        const input = []
        const filterBelowMin = filter.byToggleBelowMin('true')
        const dontFilterBelowMin = filter.byToggleBelowMin('false')
        assert.deepEqual(filterBelowMin(input), [])
        assert.deepEqual(dontFilterBelowMin(input), [])
    })

    it('takes as input a removeBelowMin boolean and returns everything if true, and returns only meetsMin === 1 if false', () => {
        let input = [
            { someData: 'a', meetsMin: 0 },
            { someData: 'b', meetsMin: 0 },
            { someData: 'c', meetsMin: 1 },
            { someData: 'd', meetsMin: 0 },
            { someData: 'e', meetsMin: 1 },
        ]
        const filterBelowMin = filter.byToggleBelowMin('true')
        assert.deepEqual(filterBelowMin(input), input)
        const dontFilterBelowMin = filter.byToggleBelowMin('false')
        assert.deepEqual(dontFilterBelowMin(input), [{ someData: 'c', meetsMin: 1 }, { someData: 'e', meetsMin: 1 }])

        let input1 = [{ someData: 'a', meetsMin: 0 },
        { someData: 'b', meetsMin: 0 },
        { someData: 'c', meetsMin: 0 },
        { someData: 'd', meetsMin: 0 },
        { someData: 'e', meetsMin: 0 },]
        assert.deepEqual(filterBelowMin(input1), input1)
        assert.deepEqual(dontFilterBelowMin(input1), [])

        let input2 = [{ someData: 'a', meetsMin: 1 },
        { someData: 'b', meetsMin: 1 },
        { someData: 'c', meetsMin: 1 },
        { someData: 'd', meetsMin: 1 },
        { someData: 'e', meetsMin: 1 },]
        assert.deepEqual(filterBelowMin(input2), input2)
        assert.deepEqual(dontFilterBelowMin(input2), input2)
    })})
    describe('selectFields', () => {        
    it('can handle empty array', () => {
        let input = [            { "questionCode": "UMI6" },
        { "questionCode": "UMI6" },
        { "questionCode": "UMI6" },
    ]
        const selectInstructor = filter.selectFields("UMI6", ["instructor"])
        assert.deepEqual(selectInstructor(input), input)
    })
    it('takes as input an array of fields and returns an object with only those indicated fields that do exist within the object', () => {
        let input1 = [
            { "instructor": "'John Doe'", "courseNum": "LFSLC 100 001", "UMI6Avg": 4, "UMI6Dispersion": 0.2, "UMI6PercentFavourable": 90, "classSize": 50, "percentResponses": "30%" },
            { "instructor": "'John Doe'", "courseNum": "LFSLC 100 001", "UMI6Avg": 3, "UMI6Dispersion": 0.2, "UMI6PercentFavourable": 90, "classSize": 20, "percentResponses": "30%" },
            { "instructor": "'John Doe'", "courseNum": "LFSLC 100 001", "UMI6Avg": 2, "UMI6Dispersion": 0.2, "UMI6PercentFavourable": 90, "classSize": 90, "percentResponses": "30%" }
        ]
        let output1 = [
            { "instructor": "'John Doe'", "questionCode": "UMI6" },
            { "instructor": "'John Doe'", "questionCode": "UMI6" },
            { "instructor": "'John Doe'", "questionCode": "UMI6" },
        ]
        const selectInstructor = filter.selectFields("UMI6", ["instructor"])
        assert.deepEqual(selectInstructor(input1), output1)
        let output2 = [
            { "questionCode": "UMI6" },
            { "questionCode": "UMI6" },
            { "questionCode": "UMI6" },
        ]
        const selectNonExistentField = filter.selectFields("UMI6", ["test"])
        assert.deepEqual(selectNonExistentField(input1), output2)
        let output3 = [
            { "Avg": 4, "questionCode": "UMI6" },
            { "Avg": 3, "questionCode": "UMI6" },
            { "Avg": 2, "questionCode": "UMI6" },
        ]
        const selectExAndNonExistentFields = filter.selectFields("UMI6", ["test", "Avg"])
        assert.deepEqual(selectExAndNonExistentFields(input1), output3)
        let output4 = [
            { "questionCode": "UMI5" },
            { "questionCode": "UMI5" },
            { "questionCode": "UMI5" },
        ]
        const selectNonExistentQC = filter.selectFields("UMI5", ["Avg"])
        assert.deepEqual(selectNonExistentQC(input1), output4)
        
    })
})