/* global describe, it */
import assert from 'assert'
import { aggregateEnrolmentByCourse } from '../src/scripts/createEnrolmentTrendCollection.js'

describe('aggregateEnrolmentByCourse test', () => {
  it('takes list of courses and returns aggregated sections for total enrolment by course and term', () => {
    let input = [{
      'year': 2017,
      'term': 'SA',
      'course': 'FAKECOURSE 123',
      'courseLevel': 5,
      'dept': 'HUNU',
      'instructorName': 'Fake N',
      'PUID': '1111',
      'enrolment': 5
    },
    {
      'year': 2016,
      'term': 'SA',
      'course': 'ECON 550',
      'courseLevel': 5,
      'dept': 'ECON',
      'instructorName': 'Fake N',
      'PUID': '1111',
      'enrolment': 10
    },
    {
      'year': 2017,
      'term': 'SA',
      'course': 'FAKECOURSE 123',
      'courseLevel': 5,
      'dept': 'HUNU',
      'instructorName': 'Fake N',
      'PUID': '1111',
      'enrolment': 1
    },
    {
      'year': 2017,
      'term': 'ST1',
      'course': 'ECON 550',
      'courseLevel': 5,
      'dept': 'ECON',
      'instructorName': 'Fake N',
      'PUID': '1111',
      'enrolment': 2
    },
    {
      'year': 2016,
      'term': 'WT1',
      'course': 'FAKECOURSE 123',
      'courseLevel': 5,
      'dept': 'HUNU',
      'instructorName': 'Fake N',
      'PUID': '1111',
      'enrolment': 3
    },
    {
      'year': 2017,
      'term': 'ST1',
      'course': 'ECON 550',
      'courseLevel': 5,
      'dept': 'ECON',
      'instructorName': 'Fake N',
      'PUID': '1111',
      'enrolment': 3
    }]
    let output = [{
      'Course': 'FAKECOURSE 123',
      'Terms': [
        {
          'year': '2017SA',
          'enrolment': 6
        },
        {
          'year': '2016WT1',
          'enrolment': 3
        }

      ]
    },
    {
      'Course': 'ECON 550',
      'Terms': [
        {
          'year': '2016SA',
          'enrolment': 10
        },
        {
          'year': '2017ST1',
          'enrolment': 5
        }

      ]
    }
    ]
    assert.deepEqual(aggregateEnrolmentByCourse(input), output)
  })
})
