/* global describe, it */
 import assert from 'assert'
 import { aggregateCP, addDeptData } from '../src/scripts/createCoursePerformanceCollection.js'

 const deptData = [{
   '2016': {
     'facultyAverage': {
       'UMI1': 3.1,
       'UMI2': 1.7,
       'UMI3': 3.5,
       'UMI4': 2.4,
       'UMI5': 1.76,
       'UMI6': 4.99,
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
       'UMI1': 4.123456,
       'UMI2': 1.912034,
       'UMI3': 3.99999999,
       'UMI4': 1.234,
       'UMI5': 4.1,
       'UMI6': 2.6748249353,
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
       'UMI1': 1.2356,
       'UMI2': 1.2356,
       'UMI3': 1.2356,
       'UMI4': 1.2356,
       'UMI5': 1.2356,
       'UMI6': 1.2356,
       'averageLength': 5
     },
     'HUNUAverage': {
       'UMI1': 1.2356,
       'UMI2': 1.2356,
       'UMI3': 1.2356,
       'UMI4': 1.2356,
       'UMI5': 1.2356,
       'UMI6': 1.2356,
       'averageLength': 5
     },
     'RMESAverage': {
       'UMI1': 1.2356,
       'UMI2': 1.2356,
       'UMI3': 1.2356,
       'UMI4': 1.2356,
       'UMI5': 1.2356,
       'UMI6': 1.2356,
       'averageLength': 5
     }
   }
 },
 {
   '2017': {
     'facultyAverage': {
       'UMI1': 3.1,
       'UMI2': 1.7,
       'UMI3': 3.5,
       'UMI4': 2.4,
       'UMI5': 1.76,
       'UMI6': 4.99,
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
       'UMI1': 4.123456,
       'UMI2': 1.912034,
       'UMI3': 3.99999999,
       'UMI4': 1.234,
       'UMI5': 4.1,
       'UMI6': 2.6748249353,
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
       'UMI1': 1.2356,
       'UMI2': 1.2356,
       'UMI3': 1.2356,
       'UMI4': 1.2356,
       'UMI5': 1.2356,
       'UMI6': 1.2356,
       'averageLength': 5
     },
     'HUNUAverage': {
       'UMI1': 1.2356,
       'UMI2': 1.2356,
       'UMI3': 1.2356,
       'UMI4': 1.2356,
       'UMI5': 1.2356,
       'UMI6': 1.2356,
       'averageLength': 5
     },
     'RMESAverage': {
       'UMI1': 1.2356,
       'UMI2': 1.2356,
       'UMI3': 1.2356,
       'UMI4': 1.2356,
       'UMI5': 1.2356,
       'UMI6': 1.2356,
       'averageLength': 5
     }
   }
 }]

 describe('addDeptData test', () => {
   it('takes an instructor record array of course objects and an array of dept and faculty averages and returns the combined array of the applicable department and faculty based on year', () => {
     let input = [{
       'year': 2017,
       'term': 'SA',
       'course': 'FAKECOURSE 123',
       'courseLevel': 5,
       'dept': 'PLNT',
       'instructorName': 'Fake N',
       'PUID': '1111'
     },
     {
       'year': 2016,
       'term': 'SA',
       'course': 'ECON 550',
       'courseLevel': 5,
       'dept': 'ECON',
       'instructorName': 'Fake N',
       'PUID': '1111'
     },
     {
       'year': 2017,
       'term': 'SA',
       'course': 'HUNU 550',
       'courseLevel': 5,
       'dept': 'HUNU',
       'instructorName': 'Fake N',
       'PUID': '1111'
     }]
     let output = [{
       'year': 2017,
       'term': 'SA',
       'course': 'FAKECOURSE 123',
       'courseLevel': 5,
       'dept': 'PLNT',
       'instructorName': 'Fake N',
       'PUID': '1111',
       'facultyAverage': {
         'UMI1': 3.1,
         'UMI2': 1.7,
         'UMI3': 3.5,
         'UMI4': 2.4,
         'UMI5': 1.76,
         'UMI6': 4.99,
         'averageLength': 4255
       },
       'deptAverage': {
         'UMI1': 4.123456,
         'UMI2': 1.912034,
         'UMI3': 3.99999999,
         'UMI4': 1.234,
         'UMI5': 4.1,
         'UMI6': 2.6748249353,
         'averageLength': 9
       }
     },
     {
       'year': 2016,
       'term': 'SA',
       'course': 'ECON 550',
       'courseLevel': 5,
       'dept': 'ECON',
       'instructorName': 'Fake N',
       'PUID': '1111',
       'facultyAverage': {
         'UMI1': 3.1,
         'UMI2': 1.7,
         'UMI3': 3.5,
         'UMI4': 2.4,
         'UMI5': 1.76,
         'UMI6': 4.99,
         'averageLength': 4255
       },
       'deptAverage': {
         'UMI1': 1.2356,
         'UMI2': 1.2356,
         'UMI3': 1.2356,
         'UMI4': 1.2356,
         'UMI5': 1.2356,
         'UMI6': 1.2356,
         'averageLength': 5
       }
     },
     {
       'year': 2017,
       'term': 'SA',
       'course': 'HUNU 550',
       'courseLevel': 5,
       'dept': 'HUNU',
       'instructorName': 'Fake N',
       'PUID': '1111',
       'facultyAverage': {
         'UMI1': 3.1,
         'UMI2': 1.7,
         'UMI3': 3.5,
         'UMI4': 2.4,
         'UMI5': 1.76,
         'UMI6': 4.99,
         'averageLength': 4255
       },
       'deptAverage': {
         'UMI1': 1.2356,
         'UMI2': 1.2356,
         'UMI3': 1.2356,
         'UMI4': 1.2356,
         'UMI5': 1.2356,
         'UMI6': 1.2356,
         'averageLength': 5
       }
     }]
     assert.deepEqual(JSON.stringify(addDeptData(input, deptData)), JSON.stringify(output))
   })
 })

 describe('createCPObj', () => {
   it('takes a array of objects and returns the aggregated data converted into an array of objects by instructor', () => {
     const UMIInstructorData = [
       {
         PUID: '1110',
         Courses: [{
           'year': 2016,
           'term': 'SA',
           'course': 'SOIL 101',
           'courseLevel': 5,
           'dept': 'SOIL',
           'instructorName': 'UBC P',
           'PUID': '1110'
         }]
       },
       {
         PUID: '1111',
         Courses: [{
           'year': 2017,
           'term': 'SA',
           'course': 'FAKECOURSE 123',
           'courseLevel': 5,
           'dept': 'PLNT',
           'instructorName': 'Fake N',
           'PUID': '1111'
         }]
       }
     ]
     let output = [{
       PUID: '1110',
       Courses: [{
         'year': 2016,
         'term': 'SA',
         'course': 'SOIL 101',
         'courseLevel': 5,
         'dept': 'SOIL',
         'instructorName': 'UBC P',
         'PUID': '1110',
         'facultyAverage': {
           'UMI1': 3.1,
           'UMI2': 1.7,
           'UMI3': 3.5,
           'UMI4': 2.4,
           'UMI5': 1.76,
           'UMI6': 4.99,
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
       PUID: '1111',
       Courses: [{
         'year': 2017,
         'term': 'SA',
         'course': 'FAKECOURSE 123',
         'courseLevel': 5,
         'dept': 'PLNT',
         'instructorName': 'Fake N',
         'PUID': '1111',
         'facultyAverage': {
           'UMI1': 3.1,
           'UMI2': 1.7,
           'UMI3': 3.5,
           'UMI4': 2.4,
           'UMI5': 1.76,
           'UMI6': 4.99,
           'averageLength': 4255
         },
         'deptAverage': {
           'UMI1': 4.123456,
           'UMI2': 1.912034,
           'UMI3': 3.99999999,
           'UMI4': 1.234,
           'UMI5': 4.1,
           'UMI6': 2.6748249353,
           'averageLength': 9
         }
       }]
     }]
     assert.deepEqual(aggregateCP(UMIInstructorData, deptData), output)
   })
 })
