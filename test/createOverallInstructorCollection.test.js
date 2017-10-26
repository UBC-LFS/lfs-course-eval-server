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
        'gender': {
          'Female': 195,
          'Male': 30
        },
        'enrolment': 60,
        'UMI1': {
          'count': {
            '1': 8,
            '2': 8,
            '3': 7,
            '4': 23,
            '5': 13
          }
        },
        'UMI2': {
          'count': {
            '1': 0,
            '2': 3,
            '3': 0,
            '4': 0,
            '5': 3
          }
        },
        'UMI3': {
          'count': {
            '1': 3,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 3
          }
        },
        'UMI4': {
          'count': {
            '1': 0,
            '2': 0,
            '3': 6,
            '4': 0,
            '5': 0
          }
        },
        'UMI5': {
          'count': {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 3,
            '5': 3
          }
        },
        'UMI6': {
          'count': {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 6
          }
        }
      }, {
        instructorName: 'Barnes, Joey',
        'gender': {
          'Female': 130,
          'Male': 20
        },
        'enrolment': 40,
        'UMI1': {
          'count': {
            '1': 6,
            '2': 4,
            '3': 6,
            '4': 14,
            '5': 10
          }

        },
        'UMI2': {
          'count': {
            '1': 0,
            '2': 2,
            '3': 0,
            '4': 0,
            '5': 2
          }
        },
        'UMI3': {
          'count': {
            '1': 2,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 2
          }
        },
        'UMI4': {
          'count': {
            '1': 0,
            '2': 0,
            '3': 4,
            '4': 0,
            '5': 0
          }
        },
        'UMI5': {
          'count': {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 2,
            '5': 2
          }
        },
        'UMI6': {
          'count': {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 4
          }
        }
      }
    ]
    assert.deepEqual(aggregateOverallInstructor(aggregatedData), output)
  })
})
