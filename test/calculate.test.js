/* global describe, it */

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
    { percentResponses: 0.33, classSize: 3, Avg: 2 }], 'classSize')

    const avgAvg = calculate.avgByField([{ percentResponses: 1, classSize: 1, Avg: 3 },
    { percentResponses: 0.33, classSize: 3, Avg: 2 }], 'Avg')
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

describe('calculatePercentGender', () => {
  it('takes an array of objects and returns the percentage of gender for specified gender', () => {
    const input = [
      { gender: 'Male', UMI6: 5 },
      { gender: 'Male', UMI6: 2 },
      { gender: 'Female', UMI6: 5 },
      { gender: 'Male', UMI6: 5 },
      { gender: 'Female', UMI6: 5 },
      { gender: 'Female', UMI6: 3 },
      { gender: 'Male', UMI6: 1 }
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
      { instructor: 'Justin Lee', UMI6: 4, id: 'abcdef' },
      { instructor: 'Justin Lee', UMI6: 5, id: 'abcdef' },
      { instructor: 'Justin Lee', UMI6: 3, id: 'abcdef' },
      { instructor: 'Clara Chu', UMI6: 5, id: '12345' },
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

describe('calculateDispersionIndexOfCourse', () => {
  it('takes as input a count object and returns the dispersion index of the count', () => {
    let count = {
      '1': 30,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 30
    }
    assert.deepEqual(calculate.dispersionIndex(count), 1)
    count = {
      '1': 10,
      '2': 10,
      '3': 10,
      '4': 0,
      '5': 30
    }
    assert.deepEqual(calculate.dispersionIndex(count), 0.86)
    count = {
      '1': 60,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    }
    assert.deepEqual(calculate.dispersionIndex(count), 0)
    count = {
      '1': 1,
      '2': 1,
      '3': 1,
      '4': 50,
      '5': 7
    }
    assert.deepEqual(calculate.dispersionIndex(count), 0.20)
    count = {
      '1': 12,
      '2': 12,
      '3': 12,
      '4': 12,
      '5': 12
    }
    assert.deepEqual(calculate.dispersionIndex(count), 0.8)
  })
  it('should be able to handle missing fields in count', () => {
    let count = {
      '1': 30,
      '5': 30
    }
    assert.deepEqual(calculate.dispersionIndex(count), 1)
    count = {
      '1': 10,
      '2': 10,
      '3': 10,
      '5': 30
    }
    assert.deepEqual(calculate.dispersionIndex(count), 0.86)
  })
})

describe('calculateUMIAvg', () => {
  it('takes a count object and returns the average of that object', () => {
    let count = {
      '1': 1,
      '2': 1,
      '3': 1,
      '4': 1,
      '5': 1
    }
    assert.deepEqual(calculate.umiAvg(count), 3)
    count = {
      '1': 5,
      '2': 5,
      '3': 5,
      '4': 5,
      '5': 5
    }
    assert.deepEqual(calculate.umiAvg(count), 3)
    count = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 4,
      '5': 4
    }
    assert.deepEqual(calculate.umiAvg(count), 4.5)
    count = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 100
    }
    assert.deepEqual(calculate.umiAvg(count), 5)
    count = {
      '1': 100,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0
    }
    assert.deepEqual(calculate.umiAvg(count), 1)
  })
  it('can handle missing fields in count', () => {
    let count = {
      '1': 1,
      '5': 1
    }
    assert.deepEqual(calculate.umiAvg(count), 3)
  })
})

describe('calculatePercentFavourable', () => {
  it('takes a count object and returns the percent favourable', () => {
    let count = {
      '1': 1,
      '2': 1,
      '3': 1,
      '4': 1,
      '5': 1
    }
    assert.deepEqual(calculate.percentFavourable(count), 0.4)
    count = {
      '1': 5,
      '2': 5,
      '3': 5,
      '4': 5,
      '5': 5
    }
    assert.deepEqual(calculate.percentFavourable(count), 0.4)
    count = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 4,
      '5': 4
    }
    assert.deepEqual(calculate.percentFavourable(count), 1)
  })
  it('can handle missing fields in count', () => {
    let count = {
      '1': 1,
      '5': 1
    }
    assert.deepEqual(calculate.percentFavourable(count), 0.5)
  })
})

describe('calculatePercentileRanking', () => {
  it('can handle a single input', () => {
    let courses = [
      {
        UMI6: {
          average: 1
        }
      }
    ]
    assert.deepEqual(calculate.percentileRankingOfCourse({
      UMI6: {
        average: 1
      }
    }, 'UMI6', courses), 0.5)
  })
  it('takes a course, UMI, and all courses sortedByUMI and returns the percentile ranking of that course', () => {
    let courses = [
      {
        UMI6: {
          average: 1
        }
      },
      {
        UMI6: {
          average: 2
        }
      }
    ]
    assert.deepEqual(calculate.percentileRankingOfCourse({
      UMI6: {
        average: 2
      }
    }, 'UMI6', courses), 0.75)

    courses = [
      {
        UMI6: {
          average: 1
        }
      },
      {
        UMI6: {
          average: 2
        }
      },
      {
        UMI6: {
          average: 3
        }
      },
      {
        UMI6: {
          average: 4
        }
      }
    ]
    assert.deepEqual(calculate.percentileRankingOfCourse({
      UMI6: {
        average: 2
      }
    }, 'UMI6', courses), 0.38)
  })
})
describe('meetsMinimum', () => {
  it('takes as input a classSize and responseRate and determines if it meets minimum', () => {
    // true cases
    assert.deepEqual(calculate.meetsMinimum(2, 1), true)
    assert.deepEqual(calculate.meetsMinimum(10, 1), true)
    assert.deepEqual(calculate.meetsMinimum(11, 0.65), true)
    assert.deepEqual(calculate.meetsMinimum(19, 0.65), true)
    assert.deepEqual(calculate.meetsMinimum(20, 0.55), true)
    assert.deepEqual(calculate.meetsMinimum(34, 0.55), true)
    assert.deepEqual(calculate.meetsMinimum(35, 0.4), true)
    assert.deepEqual(calculate.meetsMinimum(45, 0.99), true)
    assert.deepEqual(calculate.meetsMinimum(49, 0.4), true)
    assert.deepEqual(calculate.meetsMinimum(50, 0.35), true)
    assert.deepEqual(calculate.meetsMinimum(74, 0.35), true)
    assert.deepEqual(calculate.meetsMinimum(75, 0.25), true)
    assert.deepEqual(calculate.meetsMinimum(99, 0.25), true)
    assert.deepEqual(calculate.meetsMinimum(100, 0.2), true)
    assert.deepEqual(calculate.meetsMinimum(149, 0.2), true)
    assert.deepEqual(calculate.meetsMinimum(150, 0.15), true)
    assert.deepEqual(calculate.meetsMinimum(299, 0.15), true)
    assert.deepEqual(calculate.meetsMinimum(300, 0.1), true)
    assert.deepEqual(calculate.meetsMinimum(499, 0.1), true)
    assert.deepEqual(calculate.meetsMinimum(10000, 0.05), true)

    // false cases
    assert.deepEqual(calculate.meetsMinimum(2, 0.5), false)
    assert.deepEqual(calculate.meetsMinimum(10, 0), false)
    assert.deepEqual(calculate.meetsMinimum(11, 0.64), false)
    assert.deepEqual(calculate.meetsMinimum(19, 0.64), false)
    assert.deepEqual(calculate.meetsMinimum(20, 0.5), false)
    assert.deepEqual(calculate.meetsMinimum(34, 0.5), false)
    assert.deepEqual(calculate.meetsMinimum(35, 0.39), false)
    assert.deepEqual(calculate.meetsMinimum(49, 0.39), false)
    assert.deepEqual(calculate.meetsMinimum(50, 0.34), false)
    assert.deepEqual(calculate.meetsMinimum(74, 0.34), false)
    assert.deepEqual(calculate.meetsMinimum(75, 0.24), false)
    assert.deepEqual(calculate.meetsMinimum(99, 0.24), false)
    assert.deepEqual(calculate.meetsMinimum(100, 0.19999), false)
    assert.deepEqual(calculate.meetsMinimum(149, 0.19999), false)
    assert.deepEqual(calculate.meetsMinimum(150, 0.14), false)
    assert.deepEqual(calculate.meetsMinimum(299, 0.149), false)
    assert.deepEqual(calculate.meetsMinimum(300, 0.0009), false)
    assert.deepEqual(calculate.meetsMinimum(499, 0.09), false)
    assert.deepEqual(calculate.meetsMinimum(10000, 0.04), false)
  })
})
