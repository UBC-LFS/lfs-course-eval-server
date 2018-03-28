/* global describe, it */
import assert from 'assert'
import { addFacultyDeptData } from '../src/scripts/createCoursePerformanceCollection.js'

describe('addFacultyDeptData', () => {
  let facultyDeptAvg = [
    {
      department: 'APBI',
      data: [
        {
          UMI1: 1.23,
          UMI2: 1.23,
          UMI3: 1.23,
          UMI4: 1.23,
          UMI5: 1.23,
          UMI6: 1.23,
          year: 2014,
          term: 'W2',
          length: 41
        }
      ]
    },
    {
      department: 'faculty',
      data: [
        {
          UMI1: 2,
          UMI2: 2,
          UMI3: 2,
          UMI4: 2,
          UMI5: 2,
          UMI6: 2,
          year: 2014,
          term: 'W2',
          length: 41
        }
      ]
    }
  ]
  it('takes an array of courses and an array of dept average data, and inserts the appropriate dept average data into a given course object', () => {
    let courses = [
      {
        year: 2014,
        term: 'W2',
        course: 'ABC 123',
        section: '001',
        dept: 'APBI',
        instructorName: 'Fake Name',
        PUID: 12345678,
        gender: {
          Female: 5,
          Male: 5
        },
        enrolment: 12,
        responseRate: 0.8,
        UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
        UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
        UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
        UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
        UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
        UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } }
      }
    ]
    let output = [
      {
        year: 2014,
        term: 'W2',
        course: 'ABC 123',
        section: '001',
        dept: 'APBI',
        instructorName: 'Fake Name',
        PUID: 12345678,
        gender: {
          Female: 5,
          Male: 5
        },
        enrolment: 12,
        responseRate: 0.8,
        UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
        UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
        UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
        UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
        UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
        UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
        deptAverage: {
          UMI1: 1.23,
          UMI2: 1.23,
          UMI3: 1.23,
          UMI4: 1.23,
          UMI5: 1.23,
          UMI6: 1.23,
          year: 2014,
          term: 'W2',
          length: 41
        },
        facultyAverage: {
          UMI1: 2,
          UMI2: 2,
          UMI3: 2,
          UMI4: 2,
          UMI5: 2,
          UMI6: 2,
          year: 2014,
          term: 'W2',
          length: 41
        }
      }
    ]
    assert.deepEqual(addFacultyDeptData(courses, facultyDeptAvg), output)
  })

it('should work for more than one course at a time', () => {
  let courses = [
    {
      year: 2014,
      term: 'W2',
      course: 'DEF 123',
      section: '001',
      dept: 'APBI',
      instructorName: 'Fake Name 2',
      PUID: 12345678,
      gender: {
        Female: 5,
        Male: 5
      },
      enrolment: 12,
      responseRate: 0.8,
      UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } }
    },
    {
      year: 2014,
      term: 'W2',
      course: 'ABC 123',
      section: '001',
      dept: 'APBI',
      instructorName: 'Fake Name',
      PUID: 12345678,
      gender: {
        Female: 5,
        Male: 5
      },
      enrolment: 12,
      responseRate: 0.8,
      UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } }
    }
  ]
  let output = [
    {
      year: 2014,
      term: 'W2',
      course: 'DEF 123',
      section: '001',
      dept: 'APBI',
      instructorName: 'Fake Name 2',
      PUID: 12345678,
      gender: {
        Female: 5,
        Male: 5
      },
      enrolment: 12,
      responseRate: 0.8,
      UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      deptAverage: {
        UMI1: 1.23,
        UMI2: 1.23,
        UMI3: 1.23,
        UMI4: 1.23,
        UMI5: 1.23,
        UMI6: 1.23,
        year: 2014,
        term: 'W2',
        length: 41
      },
      facultyAverage: {
        UMI1: 2,
        UMI2: 2,
        UMI3: 2,
        UMI4: 2,
        UMI5: 2,
        UMI6: 2,
        year: 2014,
        term: 'W2',
        length: 41
      }
    },
    {
      year: 2014,
      term: 'W2',
      course: 'ABC 123',
      section: '001',
      dept: 'APBI',
      instructorName: 'Fake Name',
      PUID: 12345678,
      gender: {
        Female: 5,
        Male: 5
      },
      enrolment: 12,
      responseRate: 0.8,
      UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
      deptAverage: {
        UMI1: 1.23,
        UMI2: 1.23,
        UMI3: 1.23,
        UMI4: 1.23,
        UMI5: 1.23,
        UMI6: 1.23,
        year: 2014,
        term: 'W2',
        length: 41
      },
      facultyAverage: {
        UMI1: 2,
        UMI2: 2,
        UMI3: 2,
        UMI4: 2,
        UMI5: 2,
        UMI6: 2,
        year: 2014,
        term: 'W2',
        length: 41
      }
    }
  ]
  assert.deepEqual(addFacultyDeptData(courses, facultyDeptAvg), output)
})

it('should work for multiple courses and averages at the same time', () => {
  facultyDeptAvg = [
    {
      department: 'APBI',
      data: [
        {
          UMI1: 1.23,
          UMI2: 1.23,
          UMI3: 1.23,
          UMI4: 1.23,
          UMI5: 1.23,
          UMI6: 1.23,
          year: 2014,
          term: 'W2',
          length: 41
        },
        {
          UMI1: 5,
          UMI2: 5,
          UMI3: 5,
          UMI4: 5,
          UMI5: 5,
          UMI6: 5,
          year: 2013,
          term: 'W1',
          length: 41
        }
      ]
    },
    {
      department: 'FNH',
      data: [
        {
          UMI1: 3,
          UMI2: 3,
          UMI3: 3,
          UMI4: 3,
          UMI5: 3,
          UMI6: 3,
          year: 2014,
          term: 'W2',
          length: 41
        },
        {
          UMI1: 4,
          UMI2: 4,
          UMI3: 4,
          UMI4: 4,
          UMI5: 4,
          UMI6: 4,
          year: 2012,
          term: 'W1',
          length: 41
        }
      ]
    }, {
      department: 'faculty',
      data: [
        {
          UMI1: 5,
          UMI2: 5,
          UMI3: 5,
          UMI4: 5,
          UMI5: 5,
          UMI6: 5,
          year: 2014,
          term: 'W2',
          length: 41
        }, {
          UMI1: 5,
          UMI2: 5,
          UMI3: 5,
          UMI4: 5,
          UMI5: 5,
          UMI6: 5,
          year: 2013,
          term: 'W1',
          length: 41
        },
        {
          UMI1: 5,
          UMI2: 5,
          UMI3: 5,
          UMI4: 5,
          UMI5: 5,
          UMI6: 5,
          year: 2012,
          term: 'W1',
          length: 41
        }
      ]
    }]

    let courses = [
        {
          year: 2014,
          term: 'W2',
          course: 'DEF 123',
          section: '001',
          dept: 'APBI',
          instructorName: 'Fake Name 2',
          PUID: 12345678,
          gender: {
            Female: 5,
            Male: 5
          },
          enrolment: 12,
          responseRate: 0.8,
          UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } }
        },
        {
          year: 2013,
          term: 'W1',
          course: 'ABC 123',
          section: '001',
          dept: 'APBI',
          instructorName: 'Fake Name',
          PUID: 12345678,
          gender: {
            Female: 5,
            Male: 5
          },
          enrolment: 12,
          responseRate: 0.8,
          UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } }
        },
        {
          year: 2014,
          term: 'W2',
          course: 'ABC 123',
          section: '001',
          dept: 'FNH',
          instructorName: 'Fake Name',
          PUID: 12345678,
          gender: {
            Female: 5,
            Male: 5
          },
          enrolment: 12,
          responseRate: 0.8,
          UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } }
        },
        {
          year: 2012,
          term: 'W1',
          course: 'ABC 123',
          section: '001',
          dept: 'FNH',
          instructorName: 'Fake Name',
          PUID: 12345678,
          gender: {
            Female: 5,
            Male: 5
          },
          enrolment: 12,
          responseRate: 0.8,
          UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } }
        }
      ]

    let output = [
        {
          year: 2014,
          term: 'W2',
          course: 'DEF 123',
          section: '001',
          dept: 'APBI',
          instructorName: 'Fake Name 2',
          PUID: 12345678,
          gender: {
            Female: 5,
            Male: 5
          },
          enrolment: 12,
          responseRate: 0.8,
          UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          deptAverage: {
            UMI1: 1.23,
            UMI2: 1.23,
            UMI3: 1.23,
            UMI4: 1.23,
            UMI5: 1.23,
            UMI6: 1.23,
            year: 2014,
            term: 'W2',
            length: 41
          },
          facultyAverage: {
            UMI1: 5,
            UMI2: 5,
            UMI3: 5,
            UMI4: 5,
            UMI5: 5,
            UMI6: 5,
            year: 2014,
            term: 'W2',
            length: 41
          }
        },
        {
          year: 2013,
          term: 'W1',
          course: 'ABC 123',
          section: '001',
          dept: 'APBI',
          instructorName: 'Fake Name',
          PUID: 12345678,
          gender: {
            Female: 5,
            Male: 5
          },
          enrolment: 12,
          responseRate: 0.8,
          UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          deptAverage: {
            UMI1: 5,
            UMI2: 5,
            UMI3: 5,
            UMI4: 5,
            UMI5: 5,
            UMI6: 5,
            year: 2013,
            term: 'W1',
            length: 41
          },
          facultyAverage: {
            UMI1: 5,
            UMI2: 5,
            UMI3: 5,
            UMI4: 5,
            UMI5: 5,
            UMI6: 5,
            year: 2013,
            term: 'W1',
            length: 41
          }
        },
        {
          year: 2014,
          term: 'W2',
          course: 'ABC 123',
          section: '001',
          dept: 'FNH',
          instructorName: 'Fake Name',
          PUID: 12345678,
          gender: {
            Female: 5,
            Male: 5
          },
          enrolment: 12,
          responseRate: 0.8,
          UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          deptAverage: {
            UMI1: 3,
            UMI2: 3,
            UMI3: 3,
            UMI4: 3,
            UMI5: 3,
            UMI6: 3,
            year: 2014,
            term: 'W2',
            length: 41
          },
          facultyAverage:
            {
              UMI1: 5,
              UMI2: 5,
              UMI3: 5,
              UMI4: 5,
              UMI5: 5,
              UMI6: 5,
              year: 2014,
              term: 'W2',
              length: 41
            }
        },
        {
          year: 2012,
          term: 'W1',
          course: 'ABC 123',
          section: '001',
          dept: 'FNH',
          instructorName: 'Fake Name',
          PUID: 12345678,
          gender: {
            Female: 5,
            Male: 5
          },
          enrolment: 12,
          responseRate: 0.8,
          UMI1: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI2: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI3: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI4: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI5: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          UMI6: { count: { '1': 0, '2': 2, '3': 3, '4': 7, '5': 5 } },
          deptAverage: {
            UMI1: 4,
            UMI2: 4,
            UMI3: 4,
            UMI4: 4,
            UMI5: 4,
            UMI6: 4,
            year: 2012,
            term: 'W1',
            length: 41
          },
          facultyAverage: {
            UMI1: 5,
            UMI2: 5,
            UMI3: 5,
            UMI4: 5,
            UMI5: 5,
            UMI6: 5,
            year: 2012,
            term: 'W1',
            length: 41
          }
        }
      ]
    assert.deepEqual(addFacultyDeptData(courses, facultyDeptAvg), output)
    })
})
