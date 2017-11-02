/* global describe, it */
import assert from 'assert'
import { aggregateCP, addDeptData, retrievePUID } from '../src/scripts/createCoursePerformanceCollection.js'

const UMIInstructorData = [{
  '1110': [{
    'year': 2016,
    'term': 'W2',
    'course': 'SOIL 550',
    'courseLevel': 5,
    'dept': 'SOIL',
    'instructorName': 'Jules W',
    'PUID': '1110'
  }]
},
{
  '1111': [{
    'year': 2017,
    'term': 'W2',
    'course': 'PLNT 550',
    'courseLevel': 5,
    'dept': 'PLNT',
    'instructorName': 'Maria H',
    'PUID': '1111'
  }]
}
]

const deptData = [{
  '2016': {
    'facultyAverage': {
      'UMI1': 4.062821111630079,
      'UMI2': 4.075970079476391,
      'UMI3': 4.100305379375147,
      'UMI4': 3.942898272552783,
      'UMI5': 4.224198455417739,
      'UMI6': 4.110096041227454,
      'averageLength': 4255
    },
    'SOILAverage': {
      'UMI1': 4.125,
      'UMI2': 4.25,
      'UMI3': 4.46875,
      'UMI4': 4.387096774193548,
      'UMI5': 4.4375,
      'UMI6': 4.375,
      'averageLength': 32
    },
    'PLNTAverage': {
      'UMI1': 4.333333333333333,
      'UMI2': 4.444444444444445,
      'UMI3': 4.777777777777778,
      'UMI4': 4.25,
      'UMI5': 4.888888888888889,
      'UMI6': 4.666666666666667,
      'averageLength': 9
    },
    'GRSAverage': {
      'UMI1': 4.076923076923077,
      'UMI2': 4.1923076923076925,
      'UMI3': 4.269230769230769,
      'UMI4': 4.428571428571429,
      'UMI5': 4.4,
      'UMI6': 4.1923076923076925,
      'averageLength': 24
    },
    'ECONAverage': {
      'UMI1': NaN,
      'UMI2': NaN,
      'UMI3': NaN,
      'UMI4': NaN,
      'UMI5': NaN,
      'UMI6': NaN,
      'averageLength': 0
    },
    'HUNUAverage': {
      'UMI1': NaN,
      'UMI2': NaN,
      'UMI3': NaN,
      'UMI4': NaN,
      'UMI5': NaN,
      'UMI6': NaN,
      'averageLength': 0
    },
    'RMESAverage': {
      'UMI1': NaN,
      'UMI2': NaN,
      'UMI3': NaN,
      'UMI4': NaN,
      'UMI5': NaN,
      'UMI6': NaN,
      'averageLength': 0
    }
  }
},
{
  '2017': {
    'facultyAverage': {
      'UMI1': 4.062821111630079,
      'UMI2': 4.075970079476391,
      'UMI3': 4.100305379375147,
      'UMI4': 3.942898272552783,
      'UMI5': 4.224198455417739,
      'UMI6': 4.110096041227454,
      'averageLength': 4255
    },
    'SOILAverage': {
      'UMI1': 1,
      'UMI2': 1,
      'UMI3': 1,
      'UMI4': 1,
      'UMI5': 1,
      'UMI6': 1,
      'averageLength': 32
    },
    'PLNTAverage': {
      'UMI1': 4.333333333333333,
      'UMI2': 4.444444444444445,
      'UMI3': 4.777777777777778,
      'UMI4': 4.25,
      'UMI5': 4.888888888888889,
      'UMI6': 4.666666666666667,
      'averageLength': 9
    },
    'GRSAverage': {
      'UMI1': 4.076923076923077,
      'UMI2': 4.1923076923076925,
      'UMI3': 4.269230769230769,
      'UMI4': 4.428571428571429,
      'UMI5': 4.4,
      'UMI6': 4.1923076923076925,
      'averageLength': 24
    },
    'ECONAverage': {
      'UMI1': NaN,
      'UMI2': NaN,
      'UMI3': NaN,
      'UMI4': NaN,
      'UMI5': NaN,
      'UMI6': NaN,
      'averageLength': 0
    },
    'HUNUAverage': {
      'UMI1': NaN,
      'UMI2': NaN,
      'UMI3': NaN,
      'UMI4': NaN,
      'UMI5': NaN,
      'UMI6': NaN,
      'averageLength': 0
    },
    'RMESAverage': {
      'UMI1': NaN,
      'UMI2': NaN,
      'UMI3': NaN,
      'UMI4': NaN,
      'UMI5': NaN,
      'UMI6': NaN,
      'averageLength': 0
    }
  }
}]

describe('addDeptData test', () => {
  it('takes an instructor record array of course objects and an array of dept and faculty averages and returns the combined array of the applicable department and faculty based on year', () => {
    let input = [{
      'year': 2017,
      'term': 'W2',
      'course': 'PLNT 550',
      'courseLevel': 5,
      'dept': 'PLNT',
      'instructorName': 'Maria H',
      'PUID': '1111'
    },
    {
      'year': 2016,
      'term': 'W2',
      'course': 'ECON 550',
      'courseLevel': 5,
      'dept': 'ECON',
      'instructorName': 'Maria H',
      'PUID': '1111'
    },
    {
      'year': 2017,
      'term': 'W2',
      'course': 'HUNU 550',
      'courseLevel': 5,
      'dept': 'HUNU',
      'instructorName': 'Maria H',
      'PUID': '1111'
    }]
    let output = [{
      'year': 2017,
      'term': 'W2',
      'course': 'PLNT 550',
      'courseLevel': 5,
      'dept': 'PLNT',
      'instructorName': 'Maria H',
      'PUID': '1111',
      'facultyAverage': {
        'UMI1': 4.062821111630079,
        'UMI2': 4.075970079476391,
        'UMI3': 4.100305379375147,
        'UMI4': 3.942898272552783,
        'UMI5': 4.224198455417739,
        'UMI6': 4.110096041227454,
        'averageLength': 4255
      },
      'deptAverage': {
        'UMI1': 4.333333333333333,
        'UMI2': 4.444444444444445,
        'UMI3': 4.777777777777778,
        'UMI4': 4.25,
        'UMI5': 4.888888888888889,
        'UMI6': 4.666666666666667,
        'averageLength': 9
      }
    },
    {
      'year': 2016,
      'term': 'W2',
      'course': 'ECON 550',
      'courseLevel': 5,
      'dept': 'ECON',
      'instructorName': 'Maria H',
      'PUID': '1111',
      'facultyAverage': {
        'UMI1': 4.062821111630079,
        'UMI2': 4.075970079476391,
        'UMI3': 4.100305379375147,
        'UMI4': 3.942898272552783,
        'UMI5': 4.224198455417739,
        'UMI6': 4.110096041227454,
        'averageLength': 4255
      },
      'deptAverage': {
        'UMI1': NaN,
        'UMI2': NaN,
        'UMI3': NaN,
        'UMI4': NaN,
        'UMI5': NaN,
        'UMI6': NaN,
        'averageLength': 0
      }
    },
    {
      'year': 2017,
      'term': 'W2',
      'course': 'HUNU 550',
      'courseLevel': 5,
      'dept': 'HUNU',
      'instructorName': 'Maria H',
      'PUID': '1111',
      'facultyAverage': {
        'UMI1': 4.062821111630079,
        'UMI2': 4.075970079476391,
        'UMI3': 4.100305379375147,
        'UMI4': 3.942898272552783,
        'UMI5': 4.224198455417739,
        'UMI6': 4.110096041227454,
        'averageLength': 4255
      },
      'deptAverage': {
        'UMI1': NaN,
        'UMI2': NaN,
        'UMI3': NaN,
        'UMI4': NaN,
        'UMI5': NaN,
        'UMI6': NaN,
        'averageLength': 0
      },
    }]
    assert.deepEqual(JSON.stringify(addDeptData(input, deptData)), JSON.stringify(output))
  })
})

describe('createCPObj', () => {
  it('takes a array of objects and returns the aggregated data converted into an array of objects by instructor', () => {
    let output = [{
      '1110': [{
        'year': 2016,
        'term': 'W2',
        'course': 'SOIL 550',
        'courseLevel': 5,
        'dept': 'SOIL',
        'instructorName': 'Jules W',
        'PUID': '1110',
        'facultyAverage': {
          'UMI1': 4.062821111630079,
          'UMI2': 4.075970079476391,
          'UMI3': 4.100305379375147,
          'UMI4': 3.942898272552783,
          'UMI5': 4.224198455417739,
          'UMI6': 4.110096041227454,
          'averageLength': 4255
        },
        'deptAverage': {
          'UMI1': 4.125,
          'UMI2': 4.25,
          'UMI3': 4.46875,
          'UMI4': 4.387096774193548,
          'UMI5': 4.4375,
          'UMI6': 4.375,
          'averageLength': 32
        }
      }]
    },
    {
      '1111': [{
        'year': 2017,
        'term': 'W2',
        'course': 'PLNT 550',
        'courseLevel': 5,
        'dept': 'PLNT',
        'instructorName': 'Maria H',
        'PUID': '1111',
        'facultyAverage': {
          'UMI1': 4.062821111630079,
          'UMI2': 4.075970079476391,
          'UMI3': 4.100305379375147,
          'UMI4': 3.942898272552783,
          'UMI5': 4.224198455417739,
          'UMI6': 4.110096041227454,
          'averageLength': 4255
        },
        'deptAverage': {
          'UMI1': 4.333333333333333,
          'UMI2': 4.444444444444445,
          'UMI3': 4.777777777777778,
          'UMI4': 4.25,
          'UMI5': 4.888888888888889,
          'UMI6': 4.666666666666667,
          'averageLength': 9
        }
      }
      ]
    }
    ]
    assert.deepEqual(aggregateCP(UMIInstructorData, deptData), output)
  })
})

describe('retrievePUID', () => {
  it('takes an instructor record and returns the PUID key', () => {
    let input = {
      '_id': 'objectid',
      '1110': [{
        'year': 2016,
        'term': 'W2',
        'course': 'SOIL 550',
        'courseLevel': 5,
        'dept': 'SOIL',
        'instructorName': 'Jules W',
        'PUID': '1110',
        'facultyAverage': {
          'UMI1': 4.062821111630079,
          'UMI2': 4.075970079476391,
          'UMI3': 4.100305379375147,
          'UMI4': 3.942898272552783,
          'UMI5': 4.224198455417739,
          'UMI6': 4.110096041227454,
          'averageLength': 4255
        }}]
    }
    assert.deepEqual(retrievePUID(input), '1110')
  })
})
