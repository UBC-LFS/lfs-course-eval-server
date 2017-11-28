/* global describe, it */
import assert from 'assert'
import { addDeptData, addDeptAndFacultyAvgIntoUMIInstructorData } from '../src/scripts/createCoursePerformanceCollection.js'

describe('addDeptData', () => {
  let deptAvg = [
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
        }
      }
    ]
    assert.deepEqual(addDeptData(courses, deptAvg), output)
  })
})
