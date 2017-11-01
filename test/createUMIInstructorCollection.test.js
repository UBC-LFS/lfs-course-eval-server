/* global describe, it */
import assert from 'assert'
import { aggregateUMIInstructor } from '../src/scripts/createUMIInstructorCollection.js'

const aggregatedData = [{
  'instructorName': 'Cat, D',
  'PUID': '7890',
  'gender': {
    'Female': 65,
    'Male': 10
  },
  'enrolment': 20,
  'responseRate': 0.45,
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

describe('createUMIInstructorObj', () => {
  it('takes a array of objects and returns the arrays of courses by instructor', () => {
    let output = [
      {'7890':
      [{
        'instructorName': 'Cat, D',
        'PUID': '7890',
        'gender': {
          'Female': 65,
          'Male': 10
        },
        'enrolment': 20,
        'responseRate': 0.45,
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
      }, {
        'instructorName': 'Cat, D',
        'PUID': '7890',
        'gender': {
          'Female': 65,
          'Male': 10
        },
        'enrolment': 20,
        'responseRate': 0.45,
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
      }]},
      {'9999': [
        {
          'instructorName': 'Barnes, Joey',
          'PUID': '9999',
          'gender': {
            'Female': 65,
            'Male': 10
          },
          'enrolment': 20,
          'responseRate': 0.45,
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
        }]}]
    assert.deepEqual(aggregateUMIInstructor(aggregatedData), output)
  })
})
