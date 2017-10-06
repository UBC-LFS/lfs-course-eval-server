/* global describe, it */
import assert from 'assert'
import * as createAggData from '../src/scripts/createAggregatedData.js'

const data1 = [{
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
  'The instructor made it clear what students were expected to learn.': 1,
  'The instructor communicated the subject matter effectively.': 5,
  'The instructor helped inspire interest in learning the subject matter.': 5,
  'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
  'The instructor showed concern for student learning.': 5,
  'Overall  the instructor was an effective teacher.': 5
}]

const data = [{
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
  'The instructor made it clear what students were expected to learn.': 1,
  'The instructor communicated the subject matter effectively.': 5,
  'The instructor helped inspire interest in learning the subject matter.': 5,
  'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
  'The instructor showed concern for student learning.': 5,
  'Overall  the instructor was an effective teacher.': 5
},
{
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
  gender: 'Male',
  research1: '',
  research2: '',
  research3: '',
  'The instructor made it clear what students were expected to learn.': 1,
  'The instructor communicated the subject matter effectively.': 2,
  'The instructor helped inspire interest in learning the subject matter.': 1,
  'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
  'The instructor showed concern for student learning.': 4,
  'Overall  the instructor was an effective teacher.': 5
}]

describe('createCourseObj', () => {
  it('takes a array of objects and returns the csv converted into an array of course objects', () => {
    let output = [
      {
        'year': 2016,
        'term': 'W2',
        'course': 'LFS 200',
        'section': '001',
        'courseName': 'Introduction to LFS',
        'courseLevel': 2,
        'dept': 'LFS',
        'instructorName': 'Justin Lee',
        'PUID': 'ABCDEFGHIKL',
        'gender': {
          'Female': 1,
          'Male': 0
        },
        'UMI1': {
          'count': {
            '1': 1
          }
        },
        'UMI2': {
          'count': {
            '5': 1
          }
        },
        'UMI3': {
          'count': {
            '5': 1
          }
        },
        'UMI4': {
          'count': {
            '3': 1
          }
        },
        'UMI5': {
          'count': {
            '5': 1
          }
        },
        'UMI6': {
          'count': {
            '5': 1
          }
        }
      }
    ]
    assert.deepEqual(createAggData.createCourseObj(data1), output)
    output = [
      {
        'year': 2016,
        'term': 'W2',
        'course': 'LFS 200',
        'section': '001',
        'courseName': 'Introduction to LFS',
        'courseLevel': 2,
        'dept': 'LFS',
        'instructorName': 'Justin Lee',
        'PUID': 'ABCDEFGHIKL',
        'gender': {
          'Female': 1,
          'Male': 1
        },
        'UMI1': {
          'count': {
            '1': 2
          }
        },
        'UMI2': {
          'count': {
            '2': 1,
            '5': 1
          }
        },
        'UMI3': {
          'count': {
            '1': 1,
            '5': 1
          }
        },
        'UMI4': {
          'count': {
            '3': 2
          }
        },
        'UMI5': {
          'count': {
            '4': 1,
            '5': 1
          }
        },
        'UMI6': {
          'count': {
            '5': 2
          }
        }
      }
    ]
    assert.deepEqual(createAggData.createCourseObj(data), output)
  })
})

describe('insertDispersionIndex', () => {
  it('takes a courseObj and inserts the dispersion index of all UMIs into it', () => {
    let obj = {
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '001',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'count': {
          '1': 2
        }
      },
      'UMI2': {
        'count': {
          '2': 1,
          '5': 1
        }
      },
      'UMI3': {
        'count': {
          '1': 1,
          '5': 1
        }
      },
      'UMI4': {
        'count': {
          '3': 2
        }
      },
      'UMI5': {
        'count': {
          '4': 1,
          '5': 1
        }
      },
      'UMI6': {
        'count': {
          '5': 2
        }
      }
    }
    let output = {
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '001',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'dispersionIndex': 0,
        'count': {
          '1': 2, '2': 0, '3': 0, '4': 0, '5': 0
        }
      },
      'UMI2': {
        'dispersionIndex': 0.75,
        'count': {
          '1': 0, '2': 1, '3': 0, '4': 0, '5': 1
        }
      },
      'UMI3': {
        'dispersionIndex': 1,
        'count': {
          '1': 1, '2': 0, '3': 0, '4': 0, '5': 1
        }
      },
      'UMI4': {
        'dispersionIndex': 0,
        'count': {
          '1': 0, '2': 0, '3': 2, '4': 0, '5': 0
        }
      },
      'UMI5': {
        'dispersionIndex': 0.25,
        'count': {
          '1': 0, '2': 0, '3': 0, '4': 1, '5': 1
        }
      },
      'UMI6': {
        'dispersionIndex': 0,
        'count': {
          '1': 0, '2': 0, '3': 0, '4': 0, '5': 2
        }
      }
    }
    assert.deepEqual(createAggData.insertDispersionIndex(obj), output)
  })
})

describe('insertAvg', () => {
  it('takes an object and returns the object with average inserted', () => {
    let obj = {
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '001',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'count': {
          '1': 2
        }
      },
      'UMI2': {
        'count': {
          '2': 1,
          '5': 1
        }
      },
      'UMI3': {
        'count': {
          '1': 1,
          '5': 1
        }
      },
      'UMI4': {
        'count': {
          '3': 2
        }
      },
      'UMI5': {
        'count': {
          '4': 1,
          '5': 1
        }
      },
      'UMI6': {
        'count': {
          '5': 2
        }
      }
    }
    let output = {
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '001',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'average': 1,
        'count': {
          '1': 2, '2': 0, '3': 0, '4': 0, '5': 0
        }
      },
      'UMI2': {
        'average': 7 / 2,
        'count': {
          '1': 0, '2': 1, '3': 0, '4': 0, '5': 1
        }
      },
      'UMI3': {
        'average': 3,
        'count': {
          '1': 1, '2': 0, '3': 0, '4': 0, '5': 1
        }
      },
      'UMI4': {
        'average': 3,
        'count': {
          '1': 0, '2': 0, '3': 2, '4': 0, '5': 0
        }
      },
      'UMI5': {
        'average': 4.5,
        'count': {
          '1': 0, '2': 0, '3': 0, '4': 1, '5': 1
        }
      },
      'UMI6': {
        'average': 5,
        'count': {
          '1': 0, '2': 0, '3': 0, '4': 0, '5': 2
        }
      }
    }
    assert.deepEqual(createAggData.insertAvg(obj), output)
  })
})

describe('insertPercentFav', () => {
  it('takes an object and returns the object with percent favourable', () => {
    let obj = {
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '001',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'count': {
          '1': 2
        }
      },
      'UMI2': {
        'count': {
          '2': 1,
          '5': 1
        }
      },
      'UMI3': {
        'count': {
          '1': 1,
          '5': 1
        }
      },
      'UMI4': {
        'count': {
          '3': 2
        }
      },
      'UMI5': {
        'count': {
          '4': 1,
          '5': 1
        }
      },
      'UMI6': {
        'count': {
          '5': 2
        }
      }
    }
    let output = {
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '001',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'percentFavourable': 0,
        'count': {
          '1': 2, '2': 0, '3': 0, '4': 0, '5': 0
        }
      },
      'UMI2': {
        'percentFavourable': 0.5,
        'count': {
          '1': 0, '2': 1, '3': 0, '4': 0, '5': 1
        }
      },
      'UMI3': {
        'percentFavourable': 0.5,
        'count': {
          '1': 1, '2': 0, '3': 0, '4': 0, '5': 1
        }
      },
      'UMI4': {
        'percentFavourable': 0,
        'count': {
          '1': 0, '2': 0, '3': 2, '4': 0, '5': 0
        }
      },
      'UMI5': {
        'percentFavourable': 1,
        'count': {
          '1': 0, '2': 0, '3': 0, '4': 1, '5': 1
        }
      },
      'UMI6': {
        'percentFavourable': 1,
        'count': {
          '1': 0, '2': 0, '3': 0, '4': 0, '5': 2
        }
      }
    }
    assert.deepEqual(createAggData.insertPercentFav(obj), output)
  })
})

describe('insertPercentileRanking', () => {
  it('can handle an input of 1', () => {
    let obj = [{
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '001',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'average': 5
      },
      'UMI2': {
        'average': 5
      },
      'UMI3': {
        'average': 5
      },
      'UMI4': {
        'average': 5
      },
      'UMI5': {
        'average': 5
      },
      'UMI6': {
        'average': 5
      }
    }]
    let output = [{
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '001',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'average': 5,
        percentileRankingByFaculty: 0.5,
        percentileRankingByDept: 0.5
      },
      'UMI2': {
        'average': 5,
        percentileRankingByFaculty: 0.5,
        percentileRankingByDept: 0.5
      },
      'UMI3': {
        'average': 5,
        percentileRankingByFaculty: 0.5,
        percentileRankingByDept: 0.5
      },
      'UMI4': {
        'average': 5,
        percentileRankingByFaculty: 0.5,
        percentileRankingByDept: 0.5
      },
      'UMI5': {
        'average': 5,
        percentileRankingByFaculty: 0.5,
        percentileRankingByDept: 0.5
      },
      'UMI6': {
        'average': 5,
        percentileRankingByFaculty: 0.5,
        percentileRankingByDept: 0.5
      }
    }]
    assert.deepEqual(createAggData.insertPercentileRanking(obj), output)
  })
  it('can compute correct percentileRanking for different UMI', () => {
    let obj = [{
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '001',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'average': 1
      },
      'UMI2': {
        'average': 1
      },
      'UMI3': {
        'average': 1
      },
      'UMI4': {
        'average': 5
      },
      'UMI5': {
        'average': 5
      },
      'UMI6': {
        'average': 5
      }
    }, {
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '002',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'average': 5
      },
      'UMI2': {
        'average': 5
      },
      'UMI3': {
        'average': 5
      },
      'UMI4': {
        'average': 1
      },
      'UMI5': {
        'average': 1
      },
      'UMI6': {
        'average': 1
      }
    }]
    let output = [{
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '002',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'average': 5,
        percentileRankingByFaculty: 0.75,
        percentileRankingByDept: 0.75
      },
      'UMI2': {
        'average': 5,
        percentileRankingByFaculty: 0.75,
        percentileRankingByDept: 0.75
      },
      'UMI3': {
        'average': 5,
        percentileRankingByFaculty: 0.75,
        percentileRankingByDept: 0.75
      },
      'UMI4': {
        'average': 1,
        percentileRankingByFaculty: 0.25,
        percentileRankingByDept: 0.25
      },
      'UMI5': {
        'average': 1,
        percentileRankingByFaculty: 0.25,
        percentileRankingByDept: 0.25
      },
      'UMI6': {
        'average': 1,
        percentileRankingByFaculty: 0.25,
        percentileRankingByDept: 0.25
      }
    }, {
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '001',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'average': 1,
        percentileRankingByFaculty: 0.25,
        percentileRankingByDept: 0.25
      },
      'UMI2': {
        'average': 1,
        percentileRankingByFaculty: 0.25,
        percentileRankingByDept: 0.25
      },
      'UMI3': {
        'average': 1,
        percentileRankingByFaculty: 0.25,
        percentileRankingByDept: 0.25
      },
      'UMI4': {
        'average': 5,
        percentileRankingByFaculty: 0.75,
        percentileRankingByDept: 0.75
      },
      'UMI5': {
        'average': 5,
        percentileRankingByFaculty: 0.75,
        percentileRankingByDept: 0.75
      },
      'UMI6': {
        'average': 5,
        percentileRankingByFaculty: 0.75,
        percentileRankingByDept: 0.75
      }
    }]
    assert.deepEqual(createAggData.insertPercentileRanking(obj), output)
  })
  it('takes an object and returns it with percentileRankingOfFaculty and percentileRankingOfTerm inserted', () => {
    let objs = [{
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '001',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'average': 5
      },
      'UMI2': {
        'average': 5
      },
      'UMI3': {
        'average': 5
      },
      'UMI4': {
        'average': 5
      },
      'UMI5': {
        'average': 5
      },
      'UMI6': {
        'average': 5
      }
    }, {
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '001',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'LFS',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'average': 1
      },
      'UMI2': {
        'average': 1
      },
      'UMI3': {
        'average': 1
      },
      'UMI4': {
        'average': 1
      },
      'UMI5': {
        'average': 1
      },
      'UMI6': {
        'average': 1
      }
    }, {
      'year': 2016,
      'term': 'W2',
      'course': 'LFS 200',
      'section': '001',
      'courseName': 'Introduction to LFS',
      'courseLevel': 2,
      'dept': 'APBI',
      'instructorName': 'Justin Lee',
      'PUID': 'ABCDEFGHIKL',
      'gender': {
        'Female': 1,
        'Male': 1
      },
      'UMI1': {
        'average': 5
      },
      'UMI2': {
        'average': 5
      },
      'UMI3': {
        'average': 5
      },
      'UMI4': {
        'average': 5
      },
      'UMI5': {
        'average': 5
      },
      'UMI6': {
        'average': 5
      }
    }]
    let output = [ { year: 2016,
      term: 'W2',
      course: 'LFS 200',
      section: '001',
      courseName: 'Introduction to LFS',
      courseLevel: 2,
      dept: 'LFS',
      instructorName: 'Justin Lee',
      PUID: 'ABCDEFGHIKL',
      gender: { Female: 1, Male: 1 },
      UMI1:
      { average: 1,
        percentileRankingByFaculty: 0.17,
        percentileRankingByDept: 0.25 },
      UMI2:
      { average: 1,
        percentileRankingByFaculty: 0.17,
        percentileRankingByDept: 0.25 },
      UMI3:
      { average: 1,
        percentileRankingByFaculty: 0.17,
        percentileRankingByDept: 0.25 },
      UMI4:
      { average: 1,
        percentileRankingByFaculty: 0.17,
        percentileRankingByDept: 0.25 },
      UMI5:
      { average: 1,
        percentileRankingByFaculty: 0.17,
        percentileRankingByDept: 0.25 },
      UMI6:
      { average: 1,
        percentileRankingByFaculty: 0.17,
        percentileRankingByDept: 0.25 } },
    { year: 2016,
      term: 'W2',
      course: 'LFS 200',
      section: '001',
      courseName: 'Introduction to LFS',
      courseLevel: 2,
      dept: 'LFS',
      instructorName: 'Justin Lee',
      PUID: 'ABCDEFGHIKL',
      gender: { Female: 1, Male: 1 },
      UMI1:
      { average: 5,
        percentileRankingByFaculty: 0.67,
        percentileRankingByDept: 0.75 },
      UMI2:
      { average: 5,
        percentileRankingByFaculty: 0.67,
        percentileRankingByDept: 0.75 },
      UMI3:
      { average: 5,
        percentileRankingByFaculty: 0.67,
        percentileRankingByDept: 0.75 },
      UMI4:
      { average: 5,
        percentileRankingByFaculty: 0.67,
        percentileRankingByDept: 0.75 },
      UMI5:
      { average: 5,
        percentileRankingByFaculty: 0.67,
        percentileRankingByDept: 0.75 },
      UMI6:
      { average: 5,
        percentileRankingByFaculty: 0.67,
        percentileRankingByDept: 0.75 } },
    { year: 2016,
      term: 'W2',
      course: 'LFS 200',
      section: '001',
      courseName: 'Introduction to LFS',
      courseLevel: 2,
      dept: 'APBI',
      instructorName: 'Justin Lee',
      PUID: 'ABCDEFGHIKL',
      gender: { Female: 1, Male: 1 },
      UMI1:
      { average: 5,
        percentileRankingByFaculty: 0.67,
        percentileRankingByDept: 0.5 },
      UMI2:
      { average: 5,
        percentileRankingByFaculty: 0.67,
        percentileRankingByDept: 0.5 },
      UMI3:
      { average: 5,
        percentileRankingByFaculty: 0.67,
        percentileRankingByDept: 0.5 },
      UMI4:
      { average: 5,
        percentileRankingByFaculty: 0.67,
        percentileRankingByDept: 0.5 },
      UMI5:
      { average: 5,
        percentileRankingByFaculty: 0.67,
        percentileRankingByDept: 0.5 },
      UMI6:
      { average: 5,
        percentileRankingByFaculty: 0.67,
        percentileRankingByDept: 0.5 } } ]

    assert.deepEqual(createAggData.insertPercentileRanking(objs), output)
  })
})
