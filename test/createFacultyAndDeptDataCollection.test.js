/* global describe, it */

import assert from 'assert'
import { createAverage } from '../src/scripts/createFacultyAndDeptDataCollection'

describe('calculateAverage', () => {
  it('takes as input sections and returns an array of dept objects with averages separated by terms', () => {
    let input = [
      {
        'year': 2014,
        'term': 'W2',
        'dept': 'LFS',
        'UMI1': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 5, '5': 5 }
        },
        'UMI2': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 5, '5': 5 }
        },
        'UMI3': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 5, '5': 5 }
        },
        'UMI4': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 1, '5': 1 }
        },
        'UMI5': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 0, '5': 1 }
        },
        'UMI6': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 0, '5': 10 }
        }
      }
    ]
    let output = [
      {
        'department': 'LFS',
        'data': [
          {
            'term': 'W2',
            'year': 2014,
            'UMI1': 4.5,
            'UMI2': 4.5,
            'UMI3': 4.5,
            'UMI4': 4.5,
            'UMI5': 5,
            'UMI6': 5,
            'length': 1
          }
        ]
      }
    ]
    assert.deepEqual(createAverage(input), output)

    input = [
      {
        'year': 2014,
        'term': 'W2',
        'dept': 'LFS',
        'UMI1': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 5, '5': 5 }
        },
        'UMI2': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 5, '5': 5 }
        },
        'UMI3': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 5, '5': 5 }
        },
        'UMI4': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 1, '5': 1 }
        },
        'UMI5': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 0, '5': 1 }
        },
        'UMI6': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 0, '5': 10 }
        }
      },
      {
        'year': 2014,
        'term': 'W2',
        'dept': 'LFS',
        'UMI1': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 5, '5': 5 }
        },
        'UMI2': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 5, '5': 5 }
        },
        'UMI3': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 5, '5': 5 }
        },
        'UMI4': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 1, '5': 1 }
        },
        'UMI5': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 0, '5': 1 }
        },
        'UMI6': {
          'count': { '1': 0, '2': 0, '3': 0, '4': 0, '5': 10 }
        }
      }
    ]
    output = {
      'department': 'LFS',
      'data': [
        {
          'term': 'W2',
          'year': 2014,
          'UMI1': 4.5,
          'UMI2': 4.5,
          'UMI3': 4.5,
          'UMI4': 4.5,
          'UMI5': 5,
          'UMI6': 5,
          'length': 2
        }
      ]
    }
  })
})
