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
        const dispersionInput = [
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput, 'UMI6'), 0)
        
    })
    it('takes an array of specified UMI scores and calculates the dispersion index of 1', () => {
        const dispersionInput = [
            {UMI6: 1},
            {UMI6: 1},
            {UMI6: 1},
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput, 'UMI6'), 1)
    })
    it('works for other values of UMI other than UMI6', () => {
        const dispersionInput0 = [
            {UMI1: 5},
            {UMI1: 5},
            {UMI1: 5},
            {UMI1: 5},
            {UMI1: 5},
            {UMI1: 5},
            {UMI1: 5},
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput0, 'UMI1'), 0)
        const dispersionInput1 = [
            {UMI1: 1},
            {UMI1: 1},
            {UMI1: 1},
            {UMI1: 5},
            {UMI1: 5},
            {UMI1: 5}
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput1, 'UMI1'), 1)
    })
    it('works for in between max-min dispersion index', () => {
        const dispersionInput = [
            {UMI6: 1},
            {UMI6: 1},
            {UMI6: 2},
            {UMI6: 2},
            {UMI6: 3},
            {UMI6: 3},
            {UMI6: 4},
            {UMI6: 4},
            {UMI6: 5},
            {UMI6: 5},
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput,'UMI6'), 0.8)
        const dispersionInput1 = [
            {UMI6: 1},
            {UMI6: 1},
            {UMI6: 1},
            {UMI6: 1},
            {UMI6: 1},
            {UMI6: 3},
            {UMI6: 4},
            {UMI6: 4},
            {UMI6: 5},
            {UMI6: 5},
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput1,'UMI6'), 0.8999999999999999)
        const dispersionInput2 = [
            {UMI6: 1},
            {UMI6: 2},
            {UMI6: 2},
            {UMI6: 3},
            {UMI6: 3},
            {UMI6: 3},
            {UMI6: 4},
            {UMI6: 4},
            {UMI6: 4},
            {UMI6: 4},
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput2,'UMI6'), 0.54)
        const dispersionInput3 = [
            {UMI6: 1},
            {UMI6: 1},
            {UMI6: 1},
            {UMI6: 1},
            {UMI6: 3},
            {UMI6: 3},
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
            {UMI6: 5},
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput3,'UMI6'), 0.96)
    })
    it('works for very large number of inputs', () => {
        const dispersionInput = [{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5}]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput, 'UMI6'), 0)
        const dispersionInput2 = [{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 1},{UMI6: 3},{UMI6: 3},{UMI6: 3},{UMI6: 3},{UMI6: 3},{UMI6: 3},{UMI6: 3},{UMI6: 3},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},{UMI6: 5},]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput2,'UMI6'), 0.96)
    })
    it('works on regular input arrays', () => {
        const input = [
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 1},
            {term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'LFS', UMI1: 1},
            {term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI1: 1},
            {term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI1: 1},
            {term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI1: 1}
        ]
        assert.deepEqual(calculate.dispersionIndex(input, 'UMI1'), 0)
        const input1 = [
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 1},
            {term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'LFS', UMI1: 1},
            {term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI1: 5},
            {term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI1: 5},
            {term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI1: 5},
            {term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI6: 5},
            {term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI3: 5},
            {term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI4: 5},
            {term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI12: 5}
        ]
        assert.deepEqual(calculate.dispersionIndex(input1, 'UMI1'), 1)
    })
})

describe('calculatePercentileRankingOfCourse', () => {
    it('takes as input courseNum, year, term, umi, arr and returns the percentile ranking of that course compared to all others by average UMI score of the specified umi', () => {
        const input = [
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},

            {term: '2016W1', courseNum: 'LFSLC 500 002', instructor: 'Doe Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 500 002', instructor: 'Doe Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 500 002', instructor: 'Doe Doe', UMI1: 3},

            {term: '2016W1', courseNum: 'LFSLC 123 002', instructor: 'Alb Bla', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 123 002', instructor: 'Alb Bla', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 123 002', instructor: 'Alb Bla', UMI1: 3},

            {term: '2017W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2017W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2017W2', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', input), 0.33)
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 123 002', 2016, 'W1', 'UMI1', input), 0.67)
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 500 002', 2016, 'W1', 'UMI1', input), 0.01)
    })
    it('can handle no inputs', () => {
        const emptyInput = []
        expect((function () { calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', emptyInput) })).toThrow('No valid courses in array')
    })
    it('can handle extremely few inputs', () => {
        let fewInputs = [
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1}
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', fewInputs), 0.01)

        fewInputs = [
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1}
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', fewInputs), 0.25)

        fewInputs = [
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 5}
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', fewInputs), 0.01)

        fewInputs = [
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1}
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', fewInputs), 0.50)
    })
    it('can handle inputs with multiple UMIs', () => {
        let fewInputs = [
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1},

            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI5: 5}
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', fewInputs), 0.25)

        fewInputs = [
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1},
            
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI5: 5}
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI5', fewInputs), 0.01)
    })
    it('can handle large number of inputs', () => {
        let largeInputs = [

            //average is 3
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},

            {term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1},
            
            {term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 2},

            {term: '2016W1', courseNum: 'LFSLC 300 001', instructor: 'John Doe', UMI1: 4},

            {term: '2016W1', courseNum: 'LFSLC 400 001', instructor: 'John Doe', UMI1: 5},
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', largeInputs), 0.4)
        largeInputs = [
            //average is 3
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4},
            {term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5},

            {term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1},
            
            {term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 2},

            {term: '2016W1', courseNum: 'LFSLC 300 001', instructor: 'John Doe', UMI1: 4},

            {term: '2016W1', courseNum: 'LFSLC 400 001', instructor: 'John Doe', UMI1: 5},

            {term: '2016W1', courseNum: 'LFSLC 425 001', instructor: 'John Doe', UMI1: 3},
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', largeInputs), 0.42)
    })
})