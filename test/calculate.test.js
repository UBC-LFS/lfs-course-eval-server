import assert from 'assert'
import * as calculate from '../src/utils/calculate'

describe('calculateQuestionAvg', () => {
    it('takes an array and returns the average rating of the array with consideration of class size', () => {
        assert.deepEqual(2.5, calculate.questionAvg([{ percentResponses: 1, classSize: 1, Avg: 3 },
        { percentResponses: 0.33, classSize: 3, Avg: 2 }]))
    })
    it('takes a single value in an array and returns that average', () => {
        assert.deepEqual(3, calculate.questionAvg([{ percentResponses: 1, classSize: 1, Avg: 3 }]))
    })
})
describe('calculateAvgByField', () => {
    it('takes an array and returns the average value of the specified field', () => {
        const avgClassSize = calculate.avgByField([{ percentResponses: 1, classSize: 1, Avg: 3 },
        { percentResponses: 0.33, classSize: 3, Avg: 2 }], "classSize")
        
        const avgAvg = calculate.avgByField([{ percentResponses: 1, classSize: 1, Avg: 3 },
        { percentResponses: 0.33, classSize: 3, Avg: 2 }], "Avg")
        assert.deepEqual(2, avgClassSize)
        assert.deepEqual(2.5, avgAvg)
    })
    it('takes a single value in an array and returns that average', () => {
        assert.deepEqual(3, calculate.questionAvg([{ percentResponses: 1, classSize: 1, Avg: 3 }]))
    })
})
describe('calculateAvg', () => {
    it('takes an array and returns the average of that array', () => {
        assert.deepEqual(3, calculate.avg([1, 2, 3, 4, 5]))
        assert.deepEqual(1, calculate.avg([1]))
    })
})

describe('calculateMedian', () => {
    it('takes an array and returns the median of that array', () => {
        assert.deepEqual(3, calculate.median([1, 2, 3, 4, 5]))
        assert.deepEqual(3, calculate.median([1, 3, 4]))
        assert.deepEqual(3.5, calculate.median([1, 3, 4, 5]))
        assert.deepEqual(3.5, calculate.median([1, 3, 4, 57]))
        assert.deepEqual(4, calculate.median([1, 3, 4, 5, 7]))
    })
})

describe('calculatePercentFavourable', () => {
    it('takes an array of numbers ranging from 1-5 and returns the percent of numbers greater than or equal to 4', () => {
        assert.deepEqual(0.5, calculate.percentFavourable([1, 2, 3, 4, 5, 5]))
        assert.deepEqual(1, calculate.percentFavourable([4, 5, 5]))
        assert.deepEqual(0, calculate.percentFavourable([1, 2, 3]))
        assert.deepEqual(0, calculate.percentFavourable([]))
        assert.deepEqual(0.8, calculate.percentFavourable([4, 4, 4, 4, 1]))
        assert.deepEqual(0.2, calculate.percentFavourable([2, 2, 2, 2, 5]))
        assert.deepEqual(0.1, calculate.percentFavourable([2, 2, 1, 2, 3, 4, 3, 3, 3, 2]))
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
        assert.deepEqual(calculate.percentGender('Male', input), 4 / 7)
        assert.deepEqual(calculate.percentGender('Female', input), 3 / 7)

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
            { instructor: 'Justin Lee', UMI6: 4, id: "abcdef" },
            { instructor: 'Justin Lee', UMI6: 5, id: "abcdef" },
            { instructor: 'Justin Lee', UMI6: 3, id: "abcdef" },
            { instructor: 'Clara Chu', UMI6: 5, id: "12345" },
            { instructor: 'Patrick Lin', UMI6: 3, id: 'acb' },
            { instructor: 'Soo Kim', UMI6: 4, id: '123' },
            { instructor: 'Patrick Lin', UMI6: 4, id: 'acb' }
        ]
        assert.deepEqual(calculate.umiAvgOfInstructor('abcdef', 'UMI6', input1), 4)
        assert.deepEqual(calculate.umiAvgOfInstructor('12345', 'UMI6', input1), 5)
        assert.deepEqual(calculate.umiAvgOfInstructor('acb', 'UMI6', input1), 3.5)
        assert.deepEqual(calculate.umiAvgOfInstructor('123', 'UMI6', input1), 4)
    })
})

describe('calculateUMIAvgOfCourse', () => {
    it('takes as input courseNum, year, tem, umi, and arr and returns the UMI average of the course', () => {
        const input = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 5 },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'LFS', UMI1: 1 },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI1: 1 },
            { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI1: 1 },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI1: 1 }
        ]
        assert.deepEqual(calculate.umiAvgOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', input), 4.5)
    })
})

describe('calculateDispersionIndex', () => {
    it('can handle no inputs for calculating dispersion', () => {
        const dispersionInput = []
        expect((function () { calculate.dispersionIndex(dispersionInput, 'UMI1') })).toThrow('No valid courses in array')
    })
    it('can handle inputs with no matching question key for calculating dispersion', () => {
        const dispersionInput = [{ UMI6: 5 },
        { UMI6: 5 },
        { UMI6: 5 },
        { UMI6: 5 },
        { UMI6: 5 },
        { UMI6: 5 },
        { UMI6: 5 }]
        expect((function () { calculate.dispersionIndex(dispersionInput, 'UMI1') })).toThrow('No valid courses in array')
    })
    it('takes an array of specified UMI scores and calculates the dispersion index of 0', () => {
        const dispersionInput = [
            { UMI6: 5 },
            { UMI6: 5 },
            { UMI6: 5 },
            { UMI6: 5 },
            { UMI6: 5 },
            { UMI6: 5 },
            { UMI6: 5 }
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput, 'UMI6'), 0)

    })
    it('takes an array of specified UMI scores and calculates the dispersion index of 1', () => {
        const dispersionInput = [
            { UMI6: 1 },
            { UMI6: 1 },
            { UMI6: 1 },
            { UMI6: 5 },
            { UMI6: 5 },
            { UMI6: 5 },
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput, 'UMI6'), 1)
    })
    it('works for other values of UMI other than UMI6', () => {
        const dispersionInput0 = [
            { UMI1: 5 },
            { UMI1: 5 },
            { UMI1: 5 },
            { UMI1: 5 },
            { UMI1: 5 },
            { UMI1: 5 },
            { UMI1: 5 },
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput0, 'UMI1'), 0)
        const dispersionInput1 = [
            { UMI1: 1 },
            { UMI1: 1 },
            { UMI1: 1 },
            { UMI1: 5 },
            { UMI1: 5 },
            { UMI1: 5 }
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput1, 'UMI1'), 1)
    })
    it('works for in between max-min dispersion index', () => {
        const dispersionInput = [
            { UMI6: 1 },
            { UMI6: 1 },
            { UMI6: 2 },
            { UMI6: 2 },
            { UMI6: 3 },
            { UMI6: 3 },
            { UMI6: 4 },
            { UMI6: 4 },
            { UMI6: 5 },
            { UMI6: 5 },
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput, 'UMI6'), 0.8)
        const dispersionInput1 = [
            { UMI6: 1 },
            { UMI6: 1 },
            { UMI6: 1 },
            { UMI6: 1 },
            { UMI6: 1 },
            { UMI6: 3 },
            { UMI6: 4 },
            { UMI6: 4 },
            { UMI6: 5 },
            { UMI6: 5 },
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput1, 'UMI6'), 0.8999999999999999)
        const dispersionInput2 = [
            { UMI6: 1 },
            { UMI6: 2 },
            { UMI6: 2 },
            { UMI6: 3 },
            { UMI6: 3 },
            { UMI6: 3 },
            { UMI6: 4 },
            { UMI6: 4 },
            { UMI6: 4 },
            { UMI6: 4 },
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput2, 'UMI6'), 0.54)
        const dispersionInput3 = [
            { UMI6: 1 },
            { UMI6: 1 },
            { UMI6: 1 },
            { UMI6: 1 },
            { UMI6: 3 },
            { UMI6: 3 },
            { UMI6: 5 },
            { UMI6: 5 },
            { UMI6: 5 },
            { UMI6: 5 },
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput3, 'UMI6'), 0.96)
    })
    it('works for single input', () => {
        const dispersionInput = [
            { UMI6: 1 }
        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput, 'UMI6'), 0)
    })
    it('works for equally distributed responses across all possible scores', () => {
        const dispersionInput = [
            { UMI6: 1 },
            { UMI6: 2 },
            { UMI6: 3 },
            { UMI6: 4 },
            { UMI6: 5 }

        ]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput, 'UMI6'), 0.8)
    })
    it('works for very large number of inputs', () => {
        const dispersionInput = [{ UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput, 'UMI6'), 0)
        const dispersionInput2 = [{ UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 1 }, { UMI6: 3 }, { UMI6: 3 }, { UMI6: 3 }, { UMI6: 3 }, { UMI6: 3 }, { UMI6: 3 }, { UMI6: 3 }, { UMI6: 3 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 }, { UMI6: 5 },]
        assert.deepEqual(calculate.dispersionIndex(dispersionInput2, 'UMI6'), 0.96)
    })
    it('works on regular input arrays', () => {
        const input = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 1 },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'LFS', UMI1: 1 },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI1: 1 },
            { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI1: 1 },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI1: 1 }
        ]
        assert.deepEqual(calculate.dispersionIndex(input, 'UMI1'), 0)
        const input1 = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 1 },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'LFS', UMI1: 1 },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI1: 5 },
            { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI1: 5 },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI1: 5 },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI6: 5 },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI3: 5 },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI4: 5 },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI12: 5 }
        ]
        assert.deepEqual(calculate.dispersionIndex(input1, 'UMI1'), 1)
        const input2 = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', deptName: 'APBI', UMI1: 2 },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', deptName: 'LFS', UMI1: 3 },
            { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI1: 4 },
            { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', deptName: 'LFS', UMI6: 5 },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI1: 5 },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI6: 5 },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI3: 5 },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI4: 5 },
            { term: '2019S2', courseNum: 'LFSLC 200 001', instructor: 'Alice Bob', deptName: 'APBI', UMI12: 5 }
        ]
        assert.deepEqual(calculate.dispersionIndex(input2, 'UMI1'), 0.8)
    })
})

describe('calculateDispersionIndexOfCourse', () => {
    it('takes as input a count object and returns the dispersion index of the count', () => {
        let count = {
            "1": 30,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 30
        }
        assert.deepEqual(calculate.dispersionIndexV2(count), 1)
        count = {
            "1": 10,
            "2": 10,
            "3": 10,
            "4": 0,
            "5": 30
        }
        assert.deepEqual(calculate.dispersionIndexV2(count), 0.8611111111111112)
        count = {
            "1": 60,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
        }
        assert.deepEqual(calculate.dispersionIndexV2(count), 0)
        count = {
            "1": 1,
            "2": 1,
            "3": 1,
            "4": 50,
            "5": 7
        }
        assert.deepEqual(calculate.dispersionIndexV2(count), 0.1991666666666666)
        count = {
            "1": 12,
            "2": 12,
            "3": 12,
            "4": 12,
            "5": 12
        }
        assert.deepEqual(calculate.dispersionIndexV2(count), 0.8)
        
    })
})

describe('calculatePercentileRankingOfCourse', () => {
    it('takes as input courseNum, year, term, umi, arr and returns the percentile ranking of that course compared to all others by average UMI score of the specified umi', () => {
        const input = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },

            { term: '2016W1', courseNum: 'LFSLC 500 002', instructor: 'Doe Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 500 002', instructor: 'Doe Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 500 002', instructor: 'Doe Doe', UMI1: 3 },

            { term: '2016W1', courseNum: 'LFSLC 123 002', instructor: 'Alb Bla', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 123 002', instructor: 'Alb Bla', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 123 002', instructor: 'Alb Bla', UMI1: 3 },

            { term: '2017W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2017W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2017W2', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', input), 0.5)
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 123 002', 2016, 'W1', 'UMI1', input), 0.83)
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 500 002', 2016, 'W1', 'UMI1', input), 0.17)
    })
    it('can handle no inputs', () => {
        const emptyInput = []
        expect((function () { calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', emptyInput) })).toThrow('No valid courses in array')
    })
    it('can handle extremely few inputs', () => {
        let fewInputs = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 }
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', fewInputs), 0.5)

        fewInputs = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1 }
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', fewInputs), 0.5)

        fewInputs = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 5 }
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', fewInputs), 0.25)

        fewInputs = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1 }
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', fewInputs), 0.75)
    })
    it('can handle inputs with multiple UMIs', () => {
        let fewInputs = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI5: 5 },

            { term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1 }
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', fewInputs), 0.5)

        fewInputs = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI5: 5 },

            { term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1 }
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI5', fewInputs), 0.5)
    })
    it('can handle large number of inputs', () => {
        let largeInputs = [

            //average is 3
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },

            { term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1 },

            { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 2 },

            { term: '2016W1', courseNum: 'LFSLC 300 001', instructor: 'John Doe', UMI1: 4 },

            { term: '2016W1', courseNum: 'LFSLC 400 001', instructor: 'John Doe', UMI1: 5 },
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', largeInputs), 0.5)
        largeInputs = [
            //average is 3
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },

            { term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1 },

            { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 2 },

            { term: '2016W1', courseNum: 'LFSLC 300 001', instructor: 'John Doe', UMI1: 4 },

            { term: '2016W1', courseNum: 'LFSLC 400 001', instructor: 'John Doe', UMI1: 5 },

            { term: '2016W1', courseNum: 'LFSLC 425 001', instructor: 'John Doe', UMI1: 3 },
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', largeInputs), 0.5)
        largeInputs = [
            //average is 3
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },

            { term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1 },

            { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 2 },

            { term: '2016W1', courseNum: 'LFSLC 300 001', instructor: 'John Doe', UMI1: 4 },

            { term: '2016W1', courseNum: 'LFSLC 400 001', instructor: 'John Doe', UMI1: 5 },

            { term: '2016W1', courseNum: 'LFSLC 425 001', instructor: 'John Doe', UMI1: 3 },
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', largeInputs), 0.5)
        largeInputs = [
            //average is 3
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 1 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 4 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI3: 5 },

            { term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1 },

            { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 2 },

            { term: '2016W1', courseNum: 'LFSLC 300 001', instructor: 'John Doe', UMI1: 4 },

            { term: '2016W1', courseNum: 'LFSLC 400 001', instructor: 'John Doe', UMI1: 5 },

            { term: '2016W1', courseNum: 'LFSLC 425 001', instructor: 'John Doe', UMI3: 3 },
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', largeInputs), 0.5)
        largeInputs = [
            //average is 3
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 1 },

            { term: '2016W1', courseNum: 'LFSLC 500 001', instructor: 'John Doe', UMI1: 1 },

            { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1 },

            { term: '2016W1', courseNum: 'LFSLC 300 001', instructor: 'John Doe', UMI1: 5 },

            { term: '2016W1', courseNum: 'LFSLC 400 001', instructor: 'John Doe', UMI1: 5 },

            { term: '2016W1', courseNum: 'LFSLC 425 001', instructor: 'John Doe', UMI3: 5 },
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', largeInputs), 0.3)
        largeInputs = [
            //average is 5
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },

            { term: '2016W1', courseNum: 'LFSLC 300 001', instructor: 'John Doe', UMI1: 1 }
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', largeInputs), (1 + 1 * 0.5) / 2)
        largeInputs = [
            //average is 5
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'John Doe', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 201 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 202 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 203 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 204 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 205 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 206 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 207 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 208 001', instructor: 'John Doe', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 209 001', instructor: 'John Doe', UMI1: 1 },
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', largeInputs), (9 + 1 * 0.5) / 10)
    })
    it('should calculate correctly for example Abdel sent via email', () => {
        let input = [
            { term: '2016W1', courseNum: 'LFSLC 100 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 101 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 102 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 103 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 104 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 105 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 106 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 107 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 108 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 109 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 110 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 111 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 112 001', UMI1: 1 },

            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'Joe', UMI1: 3 },

            { term: '2016W1', courseNum: 'LFSLC 300 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 301 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 302 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 303 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 304 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 305 001', UMI1: 5 },
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', input), 0.68)
        input = [
            { term: '2016W1', courseNum: 'LFSLC 100 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 101 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 102 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 103 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 104 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 105 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 106 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 107 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 108 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 109 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 110 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 111 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 112 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 100 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 101 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 102 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 103 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 104 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 105 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 106 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 107 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 108 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 109 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 110 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 111 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 112 001', UMI1: 2 },

            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'Joe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'Joe', UMI1: 3 },

            { term: '2016W1', courseNum: 'LFSLC 300 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 301 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 302 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 303 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 304 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 305 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 300 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 301 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 302 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 303 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 304 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 305 001', UMI1: 4 },
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', input), 0.68)
        input = [
            { term: '2016W1', courseNum: 'LFSLC 100 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 101 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 102 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 103 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 104 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 105 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 106 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 107 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 108 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 109 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 110 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 111 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 112 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 100 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 101 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 102 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 103 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 104 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 105 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 106 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 107 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 108 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 109 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 110 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 111 001', UMI1: 2 },
            { term: '2016W1', courseNum: 'LFSLC 112 001', UMI1: 2 },

            { term: '2016W1', courseNum: 'LFSLC 100 001', UMI2: 2 },
            { term: '2016W1', courseNum: 'LFSLC 107 001', UMI3: 2 },
            { term: '2016W1', courseNum: 'LFSLC 110 001', UMI5: 2 },
            { term: '2016W1', courseNum: 'LFSLC 111 001', UMI7: 2 },
            { term: '2016W1', courseNum: 'LFSLC 112 001', UMI2: 2 },

            { term: '2016W1', courseNum: 'LFSLC 223 001', UMI2: 2 },
            { term: '2016W1', courseNum: 'LFSLC 223 001', UMI2: 2 },
            { term: '2016W1', courseNum: 'LFSLC 223 001', UMI2: 2 },

            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'Joe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'Joe', UMI1: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'Joe', UMI4: 3 },
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'Joe', UMI5: 3 },

            { term: '2016W1', courseNum: 'LFSLC 300 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 301 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 302 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 303 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 304 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 305 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 300 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 301 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 302 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 303 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 304 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 305 001', UMI1: 4 },
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', input), 0.68)
    })
    it('should handle the edge cases of 1st percentile and 99th percentile', () => {
        let input = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'Joe', UMI1: 1 },

            { term: '2016W1', courseNum: 'LFSLC 300 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 301 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 302 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 303 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 304 001', UMI1: 5 },
            { term: '2016W1', courseNum: 'LFSLC 305 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 306 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 307 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 308 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 309 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 310 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 311 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 312 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 313 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 314 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 315 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 316 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 317 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 318 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 319 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 320 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 321 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 322 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 323 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 324 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 325 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 326 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 327 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 328 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 329 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 330 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 331 001', UMI1: 4 },
            { term: '2016W1', courseNum: 'LFSLC 332 001', UMI1: 4 },
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', input), 0.01)
        input = [
            { term: '2016W1', courseNum: 'LFSLC 200 001', instructor: 'Joe', UMI1: 5 },

            { term: '2016W1', courseNum: 'LFSLC 300 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 301 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 302 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 303 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 304 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 305 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 306 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 307 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 308 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 309 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 310 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 311 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 312 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 313 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 314 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 315 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 316 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 317 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 318 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 319 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 320 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 321 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 322 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 323 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 324 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 325 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 326 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 327 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 328 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 329 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 330 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 331 001', UMI1: 1 },
            { term: '2016W1', courseNum: 'LFSLC 332 001', UMI1: 1 },
        ]
        assert.deepEqual(calculate.percentileRankingOfCourse('LFSLC 200 001', 2016, 'W1', 'UMI1', input), 0.99)
    })
})