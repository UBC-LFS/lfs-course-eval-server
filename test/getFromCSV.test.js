/* global describe, it */
import * as getFromCSV from '../src/scripts/scriptUTils/getFromCSV'
import assert from 'assert'

let input = {
  surveyname: 'LFS Instructor/Course Evaluation 2016W2',
  datestart: '03/24/2017',
  dateclose: '04/09/2017',
  crsnum: 'LFS 200 001',
  crsname: 'Introduction to LFS',
  crsyear: 2,
  xlist: '',
  deptname: 'LFS',
  crs_dir: 'Justin Lee',
  resp_fac: 'Justin Lee',
  eval_id: 12345677,
  eval_uname: 'ABCDEFGHIKL',
  eval_email: 'justin@justin.com',
  tsubmit: '04/09/2017 01:01:47 PM',
  mobile: 0,
  gradyear: 2014,
  gender: 'Female',
  research1: '',
  research2: '',
  research3: '',
  'The instructor made it clear what students were expected to learn.': 3,
  'The instructor communicated the subject matter effectively.': 2,
  'The instructor helped inspire interest in learning the subject matter.': 1,
  'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
  'The instructor showed concern for student learning.': 4,
  'Overall  the instructor was an effective teacher.': 5
}

describe('getYear', () => {
  it('takes as input an object and returns the year from that object', () => {
    assert.deepEqual(getFromCSV.getYear(input), 2016)
  })
})

describe('getTerm', () => {
  it('takes as input an object and returns the term from that object', () => {
    assert.deepEqual(getFromCSV.getTerm(input), 'W2')
  })
})

describe('getCourse', () => {
  it('takes as input an object and returns the course without the section number', () => {
    assert.deepEqual(getFromCSV.getCourse(input), 'LFS 200')
    input = {
      surveyname: 'LFS Instructor/Course Evaluation 2016W2',
      datestart: '03/24/2017',
      dateclose: '04/09/2017',
      crsnum: 'FRE 385/FRE 585 001',
      crsname: 'Introduction to LFS',
      crsyear: 2,
      xlist: '',
      deptname: 'LFS',
      crs_dir: 'Justin Lee',
      resp_fac: 'Justin Lee',
      eval_id: 12345677,
      eval_uname: 'ABCDEFGHIKL',
      eval_email: 'justin@justin.com',
      tsubmit: '04/09/2017 01:01:47 PM',
      mobile: 0,
      gradyear: 2014,
      gender: 'Female',
      research1: '',
      research2: '',
      research3: '',
      'The instructor made it clear what students were expected to learn.': 3,
      'The instructor communicated the subject matter effectively.': 2,
      'The instructor helped inspire interest in learning the subject matter.': 1,
      'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
      'The instructor showed concern for student learning.': 4,
      'Overall  the instructor was an effective teacher.': 5
    }
    assert.deepEqual(getFromCSV.getCourse(input), 'FRE 385/FRE 585')
  })
})

describe('getSection', () => {
  it('takes as input an object and returns the section number of the course', () => {
    assert.deepEqual(getFromCSV.getSection(input), '001')
    input = {
      surveyname: 'LFS Instructor/Course Evaluation 2016W2',
      datestart: '03/24/2017',
      dateclose: '04/09/2017',
      crsnum: 'FRE 385/FRE 585 001',
      crsname: 'Introduction to LFS',
      crsyear: 2,
      xlist: '',
      deptname: 'LFS',
      crs_dir: 'Justin Lee',
      resp_fac: 'Justin Lee',
      eval_id: 12345677,
      eval_uname: 'ABCDEFGHIKL',
      eval_email: 'justin@justin.com',
      tsubmit: '04/09/2017 01:01:47 PM',
      mobile: 0,
      gradyear: 2014,
      gender: 'Female',
      research1: '',
      research2: '',
      research3: '',
      'The instructor made it clear what students were expected to learn.': 3,
      'The instructor communicated the subject matter effectively.': 2,
      'The instructor helped inspire interest in learning the subject matter.': 1,
      'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
      'The instructor showed concern for student learning.': 4,
      'Overall  the instructor was an effective teacher.': 5
    }
    assert.deepEqual(getFromCSV.getSection(input), '001')
  })
})

describe('getDept', () => {
  it('takes an object and returns the dept', () => {
    assert.deepEqual(getFromCSV.getDept(input), 'LFS')
  })
})

describe('getInstructorName', () => {
  it('takes an object and returns the instructor name', () => {
    assert.deepEqual(getFromCSV.getInstructorName(input), 'Justin Lee')
  })
})

describe('UMIGets', () => {
  it('gets the value of the UMIs', () => {
    assert.deepEqual(getFromCSV.getUMI1(input), 3)
    assert.deepEqual(getFromCSV.getUMI2(input), 2)
    assert.deepEqual(getFromCSV.getUMI3(input), 1)
    assert.deepEqual(getFromCSV.getUMI4(input), 3)
    assert.deepEqual(getFromCSV.getUMI5(input), 4)
    assert.deepEqual(getFromCSV.getUMI6(input), 5)
  })
})
