/* global describe, it */
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

describe('getarrayOfUMI', () => {
  it('takes an array of objects and returns the UMI values of the specified UMI', () => {
    const input = [
      { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2017W2', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Alice Bob', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 }
    ]
    const outputUMI6 = [6, 6, 6, 6, 6, 6]
    const getUMI6 = get.arrayOfUMI('UMI6')
    assert.deepEqual(getUMI6(input), outputUMI6)
    const outputUMI5 = [5, 5, 5, 5, 5, 5]
    const getUMI5 = get.arrayOfUMI('UMI5')
    assert.deepEqual(getUMI5(input), outputUMI5)
  })
})

describe('getArrayOfGender', () => {
  it('takes an array of objects and returns the genders', () => {
    const input = [
      { gender: 'Male', UMI6: 5 },
      { gender: 'Male', UMI6: 2 },
      { gender: 'Female', UMI6: 5 },
      { gender: 'Male', UMI6: 5 },
      { gender: 'Female', UMI6: 5 },
      { gender: 'Female', UMI6: 3 },
      { gender: 'Male', UMI6: 1 }
    ]
    const output = ['Male', 'Male', 'Female', 'Male', 'Female', 'Female', 'Male']
    assert.deepEqual(get.arrayOfGender()(input), output)
  })
})

describe('getPercentFromDecimal', () => {
  it('takes a decimal and converts to percent', () => {
    assert.deepEqual(get.percentFromDecimal(0.5), '50%')
    assert.deepEqual(get.percentFromDecimal(0.12345), '12.345%')
  })
})

describe('getInstructorFirstName', () => {
  it('takes a name and returns the first name', () => {
    assert.deepEqual(get.instructorFirstName('Doe, John'), 'John')
    assert.deepEqual(get.instructorFirstName('Doe, John A'), 'John')
  })
})

describe('getInstructorLastName', () => {
  it('takes a name and returns the first name', () => {
    assert.deepEqual(get.instructorLastName('Doe, John'), 'Doe')
    assert.deepEqual(get.instructorLastName('Doe, John A'), 'Doe')
  })
})

describe('getCourseLevel', () => {
  it('takes a courseNUm and returns the level of the course', () => {
    assert.deepEqual(get.courseLevel('LFSLC 100 001'), 100)
    assert.deepEqual(get.courseLevel('LFSLC 168 001'), 100)
    assert.deepEqual(get.courseLevel('LFSLC 199.98 001'), 100)
    assert.deepEqual(get.courseLevel('LFSLC 289 001'), 200)
  })
})

describe('getUniqYears', () => {
  it('takes an array of courseObj and returns the uniq years', () => {
    let input = [
      { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2017W2', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Alice Bob', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 }
    ]
    assert.deepEqual(get.uniqYears(input), [2016, 2017, 2019])
    input = [
      { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 }
    ]
    assert.deepEqual(get.uniqYears(input), [2016])
    input = []
    assert.deepEqual(get.uniqYears(input), [])
  })
})

describe('getUniqTerms', () => {
  it('takes an array of courseObj and returns the uniq terms', () => {
    let input = [
      { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2017W2', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2017S1', courseNum: 'LFSLC 100 001', instructor: 'Doe John', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Doe John', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2019S2', courseNum: 'LFSLC 100 001', instructor: 'Alice Bob', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 }
    ]
    assert.deepEqual(get.uniqTerms(input), ['W1', 'W2', 'S1', 'S2'])
    input = [
      { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 }
    ]
    assert.deepEqual(get.uniqTerms(input), ['W1'])
    input = []
    assert.deepEqual(get.uniqTerms(input), [])
  })
})

describe('getUniqCourseLevels', () => {
  it('takes an array of courseObj and returns the uniq course levels', () => {
    let input = [
      { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2017W2', courseNum: 'LFSLC 220 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2017S1', courseNum: 'LFSLC 420 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2017S1', courseNum: 'LFSLC 570 001', instructor: 'Doe John', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2019S2', courseNum: 'LFSLC 123 001', instructor: 'Doe John', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 },
      { term: '2019S2', courseNum: 'LFSLC 300 001', instructor: 'Alice Bob', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 }
    ]
    assert.deepEqual(get.uniqCourseLevels(input), [100, 200, 300, 400, 500])
    input = [
      { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6 }
    ]
    assert.deepEqual(get.uniqCourseLevels(input), [100])
    input = []
    assert.deepEqual(get.uniqCourseLevels(input), [])
  })
})

describe('getUniqDeptss', () => {
  it('takes an array of courseObj and returns the uniq dept', () => {
    let input = [
      { term: '2016W1', courseNum: 'LFSLC 100 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6, deptName: 'LFS' },
      { term: '2017W2', courseNum: 'LFSLC 220 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6, deptName: 'FNH' },
      { term: '2017S1', courseNum: 'LFSLC 420 001', instructor: 'John Doe', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6, deptName: 'LFS' },
      { term: '2017S1', courseNum: 'LFSLC 570 001', instructor: 'Doe John', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6, deptName: 'LFS' },
      { term: '2019S2', courseNum: 'LFSLC 123 001', instructor: 'Doe John', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6, deptName: 'LFS' },
      { term: '2019S2', courseNum: 'LFSLC 300 001', instructor: 'Alice Bob', UMI1: 1, UMI2: 2, UMI3: 3, UMI4: 4, UMI5: 5, UMI6: 6, deptName: 'APBI' }
    ]
    assert.deepEqual(get.uniqDepts(input), ['LFS', 'FNH', 'APBI'])
  })
})
