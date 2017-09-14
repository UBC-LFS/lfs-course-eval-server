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

describe('calculatePercentGender', () => {
    it('takes an array of objects and returns the percentage of gender for specified gender', () => {
        const input = [
            { gender: 'Male', UMI6: 5 },
            { gender: 'Male', UMI6: 2 },
            { gender: 'Female', UMI6: 5 },
            { gender: 'Male', UMI6: 5 },
            { gender: 'Female', UMI6: 5 },
            { gender: 'Female', UMI6: 3 },
            { gender: 'Male', UMI6: 1 },
        ]
        assert.deepEqual(calculate.percentGender('Male', input), 4/7)
        assert.deepEqual(calculate.percentGender('Female', input), 3/7)

    })
})

describe('calculateToTwoDecimal', () => {
    it('takes a decimal and returns to only two decimal places', () => {
        assert.deepEqual(calculate.toTwoDecimal(0.00001), 0)
        assert.deepEqual(calculate.toTwoDecimal(0.1), 0.1)
        assert.deepEqual(calculate.toTwoDecimal(0.11), 0.11)
        assert.deepEqual(calculate.toTwoDecimal(0.105), 0.11)
        assert.deepEqual(calculate.toTwoDecimal(0.105), 0.11)
        assert.deepEqual(calculate.toTwoDecimal(0.1000), 0.1)
        assert.deepEqual(calculate.toTwoDecimal(0.10001), 0.1)
        assert.deepEqual(calculate.toTwoDecimal(0.5), 0.5)
        assert.deepEqual(calculate.toTwoDecimal(0.55), 0.55)
        assert.deepEqual(calculate.toTwoDecimal(0.555), 0.56)
    })
})

describe('calculateUMIAvgOfInstructor', () => {
    it('takes instructorName, umi, and array and returns the UMI average for the specified UMI', () => {
        const input1 = [
            {instructor: 'Justin Lee', UMI6: 4},
            {instructor: 'Justin Lee', UMI6: 5},
            {instructor: 'Justin Lee', UMI6: 3},
            {instructor: 'Clara Chu', UMI6: 5},
            {instructor: 'Patrick Lin', UMI6: 3},
            {instructor: 'Soo Kim', UMI6: 4},
            {instructor: 'Patrick Lin', UMI6: 4}
        ]
        assert.deepEqual(calculate.umiAvgOfInstructor('Justin Lee', 'UMI6', input1), 4)
        assert.deepEqual(calculate.umiAvgOfInstructor('Clara Chu', 'UMI6', input1), 5)
        assert.deepEqual(calculate.umiAvgOfInstructor('Patrick Lin', 'UMI6', input1), 3.5)
        assert.deepEqual(calculate.umiAvgOfInstructor('Soo Kim', 'UMI6', input1), 4)
    })
})

describe('calculateUMIAvgOfCourse', () => {
    it('takes as input courseNum, year, tem, umi, and arr and returns the UMI average of the course', () => {
        const input = [
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 5},
            {term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'LFS', UMI1: 1},
            {term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI1: 1},
            {term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI1: 1},
            {term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI1: 1}
        ]
        assert.deepEqual(calculate.umiAvgOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', input), 4.5)
    })
})

describe('calculatePercentileRankingOfInstructor', () => {
    it('takes instructorName, umi, and array and returns the percentileRanking of given instructor', () => {
        const input1 = [
            {instructor: 'Justin Lee', UMI6: 4},
            {instructor: 'Justin Lee', UMI6: 5},
            {instructor: 'Justin Lee', UMI6: 3},
            {instructor: 'Clara Chu', UMI6: 5},
            {instructor: 'Patrick Lin', UMI6: 3},
            {instructor: 'Soo Kim', UMI6: 4},
            {instructor: 'Patrick Lin', UMI6: 4}
        ]
        assert.deepEqual(calculate.umiAvgOfInstructor('Justin Lee', 'UMI6', input1), 4)
        assert.deepEqual(calculate.umiAvgOfInstructor('Clara Chu', 'UMI6', input1), 5)
        assert.deepEqual(calculate.umiAvgOfInstructor('Patrick Lin', 'UMI6', input1), 3.5)
        assert.deepEqual(calculate.umiAvgOfInstructor('Soo Kim', 'UMI6', input1), 4)
    })
})

describe('calculateDispersionIndex', () => {
    it('takes an array of specified UMI scores and calculates the dispersion index of 0', () => {
        const dispersion0Input = [
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
        ]
        //assert.deepEqual(calculate.dispersionIndex(dispersion0Input, 'UMI6'), 0)
        
    })
    it('takes an array of specified UMI scores and calculates the dispersion index of 1', () => {
        const dispersion1Input = [
            {UMI6: 1},
            {UMI6: 1},
            {UMI6: 1},
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersion1Input, 'UMI6'), 1)
    })
})