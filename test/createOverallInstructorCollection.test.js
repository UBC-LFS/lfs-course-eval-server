/* global describe, it */
import assert from 'assert'
import { aggregateOverallInstructor } from '../src/scripts/createOverallInstructorCollection.js'

const aggregatedData = [{
  'instructorName': 'Cat, D',
  'PUID': '7890',
  'gender': {
    'Female': 65,
    'Male': 10
  },
  'enrolment': 20,
  'responseRate': 0.45,
  'dept': 'LFS',
  'UMI1': {
    'count': {
      '1': 0,
      '2': 2,
      '3': 3,
      '4': 7,
      '5': 5
    }
  },
  'UMI2': {
    'count': {
      '1': 0, '2': 1, '3': 0, '4': 0, '5': 1
    }
  },
  'UMI3': {
    'count': {
      '1': 1, '2': 0, '3': 0, '4': 0, '5': 1
    }
  },
  'UMI4': {
    'count': {
      '1': 0, '2': 0, '3': 2, '4': 0, '5': 0
    }
  },
  'UMI5': {
    'count': {
      '1': 0, '2': 0, '3': 0, '4': 1, '5': 1
    }
  },
  'UMI6': {
    'count': {
      '1': 0, '2': 0, '3': 0, '4': 0, '5': 2
    }
  }
},
{
  'instructorName': 'Barnes, Joey',
  'PUID': '9999',
  'gender': {
    'Female': 65,
    'Male': 10
  },
  'enrolment': 20,
  'responseRate': 0.45,
  'dept': 'LFS',
  'UMI1': {
    'count': {
      '1': 5,
      '2': 2,
      '3': 3,
      '4': 7,
      '5': 5
    }
  },
  'UMI2': {
    'count': {
      '1': 0, '2': 1, '3': 0, '4': 0, '5': 1
    }
  },
  'UMI3': {
    'count': {
      '1': 1, '2': 0, '3': 0, '4': 0, '5': 1
    }
  },
  'UMI4': {
    'count': {
      '1': 0, '2': 0, '3': 2, '4': 0, '5': 0
    }
  },
  'UMI5': {
    'count': {
      '1': 0, '2': 0, '3': 0, '4': 1, '5': 1
    }
  },
  'UMI6': {
    'count': {
      '1': 0, '2': 0, '3': 0, '4': 0, '5': 2
    }
  }
},
{
  'instructorName': 'Barnes, Joey',
  'PUID': '9999',
  'gender': {
    'Female': 65,
    'Male': 10
  },
  'enrolment': 20,
  'responseRate': 0.45,
  'dept': 'LFS',
  'UMI1': {
    'count': {
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 7,
      '5': 5
    }
  },
  'UMI2': {
    'count': {
      '1': 0, '2': 1, '3': 0, '4': 0, '5': 1
    }
  },
  'UMI3': {
    'count': {
      '1': 1, '2': 0, '3': 0, '4': 0, '5': 1
    }
  },
  'UMI4': {
    'count': {
      '1': 0, '2': 0, '3': 2, '4': 0, '5': 0
    }
  },
  'UMI5': {
    'count': {
      '1': 0, '2': 0, '3': 0, '4': 1, '5': 1
    }
  },
  'UMI6': {
    'count': {
      '1': 0, '2': 0, '3': 0, '4': 0, '5': 2
    }
  }
},
{
  'instructorName': 'Cat, D',
  'PUID': '7890',
  'gender': {
    'Female': 65,
    'Male': 10
  },
  'enrolment': 20,
  'responseRate': 0.45,
  'dept': 'APBI',
  'UMI1': {
    'count': {
      '1': 5,
      '2': 2,
      '3': 3,
      '4': 9,
      '5': 3
    }
  },
  'UMI2': {
    'count': {
      '1': 0, '2': 1, '3': 0, '4': 0, '5': 1
    }
  },
  'UMI3': {
    'count': {
      '1': 1, '2': 0, '3': 0, '4': 0, '5': 1
    }
  },
  'UMI4': {
    'count': {
      '1': 0, '2': 0, '3': 2, '4': 0, '5': 0
    }
  },
  'UMI5': {
    'count': {
      '1': 0, '2': 0, '3': 0, '4': 1, '5': 1
    }
  },
  'UMI6': {
    'count': {
      '1': 0, '2': 0, '3': 0, '4': 0, '5': 2
    }
  }
},
{
  'instructorName': 'Cat, D',
  'PUID': '7890',
  'gender': {
    'Female': 65,
    'Male': 10
  },
  'enrolment': 20,
  'responseRate': 0.45,
  'dept': 'LFS',
  'UMI1': {
    'count': {
      '1': 3,
      '2': 4,
      '3': 1,
      '4': 7,
      '5': 5
    }
  },
  'UMI2': {
    'count': {
      '1': 0, '2': 1, '3': 0, '4': 0, '5': 1
    }
  },
  'UMI3': {
    'count': {
      '1': 1, '2': 0, '3': 0, '4': 0, '5': 1
    }
  },
  'UMI4': {
    'count': {
      '1': 0, '2': 0, '3': 2, '4': 0, '5': 0
    }
  },
  'UMI5': {
    'count': {
      '1': 0, '2': 0, '3': 0, '4': 1, '5': 1
    }
  },
  'UMI6': {
    'count': {
      '1': 0, '2': 0, '3': 0, '4': 0, '5': 2
    }
  }
}]

describe('createOverallInstructorObj', () => {
  it('takes a array of objects and returns the aggregated data converted into an array of objects by instructor', () => {
    let output = [
      {
        instructorName: 'Cat, D',
        'dept': 'LFS, APBI',
        'gender': {
          'Female': 195,
          'Male': 30
        },
        'numStudentsTaught': 60,
        'numCoursesTaught': 3,
        'responseRate': 0.45,
        'UMI1': {
          'average': 3.42,
          'count': {
            '1': 8,
            '2': 8,
            '3': 7,
            '4': 23,
            '5': 13
          },
          'dispersionIndex': 0.72,
          'percentFavourable': 0.61
        },
        'UMI2': {
          'average': 3.5,
          'count': {
            '1': 0,
            '2': 3,
            '3': 0,
            '4': 0,
            '5': 3
          },
          'dispersionIndex': 0.75,
          'percentFavourable': 0.5
        },
        'UMI3': {
          'average': 3,
          'count': {
            '1': 3,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 3
          },
          'dispersionIndex': 1,
          'percentFavourable': 0.5
        },
        'UMI4': {
          'average': 3,
          'count': {
            '1': 0,
            '2': 0,
            '3': 6,
            '4': 0,
            '5': 0
          },
          'dispersionIndex': 0,
          'percentFavourable': 0
        },
        'UMI5': {
          'average': 4.5,
          'count': {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 3,
            '5': 3
          },
          'dispersionIndex': 0.25,
          'percentFavourable': 1
        },
        'UMI6': {
          'average': 5,
          'count': {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 6
          },
          'dispersionIndex': 0,
          'percentFavourable': 1
        }
      }, {
        instructorName: 'Barnes, Joey',
        'dept': 'LFS',
        'gender': {
          'Female': 130,
          'Male': 20
        },
        'numStudentsTaught': 40,
        'numCoursesTaught': 2,
        'responseRate': 0.45,
        'UMI1': {
          'average': 3.45,
          'count': {
            '1': 6,
            '2': 4,
            '3': 6,
            '4': 14,
            '5': 10
          },
          'dispersionIndex': 0.74,
          'percentFavourable': 0.6
        },
        'UMI2': {
          'average': 3.5,
          'count': {
            '1': 0,
            '2': 2,
            '3': 0,
            '4': 0,
            '5': 2
          },
          'dispersionIndex': 0.75,
          'percentFavourable': 0.5
        },
        'UMI3': {
          'average': 3,
          'count': {
            '1': 2,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 2
          },
          'dispersionIndex': 1,
          'percentFavourable': 0.5
        },
        'UMI4': {
          'average': 3,
          'count': {
            '1': 0,
            '2': 0,
            '3': 4,
            '4': 0,
            '5': 0
          },
          'dispersionIndex': 0,
          'percentFavourable': 0
        },
        'UMI5': {
          'average': 4.5,
          'count': {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 2,
            '5': 2
          },
          'dispersionIndex': 0.25,
          'percentFavourable': 1
        },
        'UMI6': {
          'average': 5,
          'count': {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 4
          },
          'dispersionIndex': 0,
          'percentFavourable': 1
        }
      }
    ]
    assert.deepEqual(aggregateOverallInstructor(aggregatedData), output)
  })
})
