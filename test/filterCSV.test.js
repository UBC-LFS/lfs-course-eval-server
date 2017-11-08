/* global describe, it */
import * as filterCSV from '../src/scripts/scriptUtils/filterCSV'
import assert from 'assert'

describe('byYear', () => {
  it('takes an array of courseval results and returns only the results with matching year', () => {
    let input = [
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2018SA'}
    ]
    let output = [
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'}
    ]
    assert.deepEqual(filterCSV.byYear(2017)(input), output)
    assert.deepEqual(filterCSV.byYear(2015)(input), [])
  })
})

describe('byTerm', () => {
  it('takes an array of responses and only returns the specified term', () => {
    let input = [
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017W1'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017W2'},
      {surveyname: 'LFS Instructor/Course Evaluation 2018SA'}
    ]
    let output = [
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2017SA'},
      {surveyname: 'LFS Instructor/Course Evaluation 2018SA'}
    ]
    assert.deepEqual(filterCSV.byTerm('SW')(input), [])
    assert.deepEqual(filterCSV.byTerm('SA')(input), output)
  })
})

describe('byDept', () => {
  it('takes an array of responses and only returns the specified dept', () => {
    let input = [
      {deptname: 'APBI'},
      {deptname: 'APBI'},
      {deptname: 'CPSC'},
      {deptname: 'CPSC'}
    ]
    let output = [
      {deptname: 'CPSC'},
      {deptname: 'CPSC'}
    ]
    assert.deepEqual(filterCSV.byDept('CPSC')(input), output)
    output = [
      {deptname: 'APBI'},
      {deptname: 'APBI'}
    ]
    assert.deepEqual(filterCSV.byDept('APBI')(input), output)
  })
})

describe('invalidResults', () => {
  it('takes an array of UMI results and returns only valid responses (between 1 and 5, inclusive)', () => {
    let input = [1, 2, 3, 4, 5, 6, 7, 0]
    let output = [1, 2, 3, 4, 5]
    assert.deepEqual(filterCSV.invalidResults(input), output)
  })
})

describe('byUMIs', () => {
  it('returns just specifed umi values', () => {
    let input = [
      {'The instructor made it clear what students were expected to learn.': 1},
      {'The instructor communicated the subject matter effectively.': 2},
      {'The instructor helped inspire interest in learning the subject matter.': 3},
      {'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 4},
      {'The instructor showed concern for student learning.': 5},
      {'Overall  the instructor was an effective teacher.': 1},
      {'The instructor made it clear what students were expected to learn.': 1},
      {'The instructor communicated the subject matter effectively.': 2},
      {'The instructor helped inspire interest in learning the subject matter.': 3},
      {'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 4},
      {'The instructor showed concern for student learning.': 5},
      {'Overall  the instructor was an effective teacher.': 1}
    ]
    let outputUMI1 = [1, 1]
    let outputUMI2 = [2, 2]
    let outputUMI3 = [3, 3]
    let outputUMI4 = [4, 4]
    let outputUMI5 = [5, 5]
    let outputUMI6 = [1, 1]

    assert.deepEqual(filterCSV.byUMI1(input), outputUMI1)
    assert.deepEqual(filterCSV.byUMI2(input), outputUMI2)
    assert.deepEqual(filterCSV.byUMI3(input), outputUMI3)
    assert.deepEqual(filterCSV.byUMI4(input), outputUMI4)
    assert.deepEqual(filterCSV.byUMI5(input), outputUMI5)
    assert.deepEqual(filterCSV.byUMI6(input), outputUMI6)
  })
})
