/* global describe, it */

import assert from 'assert'
import { calculateAverage, averageByYear } from '../src/scripts/createFacultyAndDeptDataCollection'

describe('calculateAverage', () => {
  it('takes an array filtered by year or dept and returns the average of UMI1-6 and the average length of each input', () => {
    let input = [
      {
        'The instructor made it clear what students were expected to learn.': 3,
        'The instructor communicated the subject matter effectively.': 3,
        'The instructor helped inspire interest in learning the subject matter.': 3,
        'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
        'The instructor showed concern for student learning.': 3,
        'Overall  the instructor was an effective teacher.': 3
      }
    ]
    assert.deepEqual(calculateAverage(input), { UMI1: 3, UMI2: 3, UMI3: 3, UMI4: 3, UMI5: 3, UMI6: 3, averageLength: 1 })
    input = [
      {
        'The instructor made it clear what students were expected to learn.': 3,
        'The instructor communicated the subject matter effectively.': 3,
        'The instructor helped inspire interest in learning the subject matter.': 3,
        'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
        'The instructor showed concern for student learning.': 3,
        'Overall  the instructor was an effective teacher.': 3
      },
      {
        'The instructor made it clear what students were expected to learn.': 3,
        'The instructor communicated the subject matter effectively.': 3,
        'The instructor helped inspire interest in learning the subject matter.': 3,
        'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
        'The instructor showed concern for student learning.': 3,
        'Overall  the instructor was an effective teacher.': 3
      }
    ]
    assert.deepEqual(calculateAverage(input), { UMI1: 3, UMI2: 3, UMI3: 3, UMI4: 3, UMI5: 3, UMI6: 3, averageLength: 2 })
    input = [
      {
        'The instructor made it clear what students were expected to learn.': 3,
        'The instructor communicated the subject matter effectively.': 3,
        'The instructor helped inspire interest in learning the subject matter.': 3,
        'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
        'The instructor showed concern for student learning.': 3,
        'Overall  the instructor was an effective teacher.': 3
      },
      {
        'The instructor made it clear what students were expected to learn.': 5,
        'The instructor communicated the subject matter effectively.': 5,
        'The instructor helped inspire interest in learning the subject matter.': 5,
        'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 5,
        'The instructor showed concern for student learning.': 5,
        'Overall  the instructor was an effective teacher.': 5
      }
    ]
    assert.deepEqual(calculateAverage(input), { UMI1: 4, UMI2: 4, UMI3: 4, UMI4: 4, UMI5: 4, UMI6: 4, averageLength: 2 })
    input = [
      {
        'The instructor made it clear what students were expected to learn.': 3,
        'The instructor communicated the subject matter effectively.': 3,
        'The instructor helped inspire interest in learning the subject matter.': 3,
        'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
        'The instructor showed concern for student learning.': 3,
        'Overall  the instructor was an effective teacher.': 3
      },
      {
        'The instructor made it clear what students were expected to learn.': 5,
        'The instructor communicated the subject matter effectively.': '',
        'The instructor helped inspire interest in learning the subject matter.': '',
        'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': '',
        'The instructor showed concern for student learning.': '',
        'Overall  the instructor was an effective teacher.': ''
      }
    ]
    assert.deepEqual(calculateAverage(input), { UMI1: 4, UMI2: 3, UMI3: 3, UMI4: 3, UMI5: 3, UMI6: 3, averageLength: 1 })
    input = [
      {
        'The instructor made it clear what students were expected to learn.': 3,
        'The instructor communicated the subject matter effectively.': 3,
        'The instructor helped inspire interest in learning the subject matter.': 3,
        'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 3,
        'The instructor showed concern for student learning.': 3,
        'Overall  the instructor was an effective teacher.': 3
      },
      {
        'The instructor made it clear what students were expected to learn.': 5,
        'The instructor communicated the subject matter effectively.': 5,
        'The instructor helped inspire interest in learning the subject matter.': 5,
        'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 5,
        'The instructor showed concern for student learning.': 5,
        'Overall  the instructor was an effective teacher.': 5
      },
      {
        'The instructor made it clear what students were expected to learn.': 5,
        'The instructor communicated the subject matter effectively.': 5,
        'The instructor helped inspire interest in learning the subject matter.': 5,
        'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 5,
        'The instructor showed concern for student learning.': 5,
        'Overall  the instructor was an effective teacher.': 5
      },
      {
        'The instructor made it clear what students were expected to learn.': 5,
        'The instructor communicated the subject matter effectively.': 5,
        'The instructor helped inspire interest in learning the subject matter.': 5,
        'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 5,
        'The instructor showed concern for student learning.': 5,
        'Overall  the instructor was an effective teacher.': 5
      },
      {
        'The instructor made it clear what students were expected to learn.': 5,
        'The instructor communicated the subject matter effectively.': 5,
        'The instructor helped inspire interest in learning the subject matter.': 5,
        'Overall  evaluation of student learning (through exams  essays  presentations  etc.) was fair.': 5,
        'The instructor showed concern for student learning.': 5,
        'Overall  the instructor was an effective teacher.': 5
      }
    ]
    assert.deepEqual(calculateAverage(input), { UMI1: 4.6, UMI2: 4.6, UMI3: 4.6, UMI4: 4.6, UMI5: 4.6, UMI6: 4.6, averageLength: 5 })
  })
})
