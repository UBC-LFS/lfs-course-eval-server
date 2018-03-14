/* global describe, it */
import assert from 'assert'
import { createYearData, createInstructorData, createMetaData } from '../src/scripts/createMetaData.js'

describe('createYearData', () => {
    it('takes a array of objects and returns the range of years with max and min class sizes', () => {
        let input = [
            {
                'year': 2014,
                'enrolment': 52
            },
            {
                'year': 2013,
                'enrolment': 100
            },
            {
                'year': 2014,
                'enrolment': 50
            },
            {
                'year': 2013,
                'enrolment': 88
            },
            {
                'year': 2014,
                'enrolment': 60
            }
        ]
        let output = [
            {
                'year': 2013,
                'minClassSize': 88,
                'maxClassSize': 100
            },
            {
                'year': 2014,
                'minClassSize': 50,
                'maxClassSize': 60
            }
        ]
        assert.deepEqual(createYearData(input), output)
    })
})
describe('createInstructorData', () => {
    it('takes a array of objects and returns the instructors and the terms they have taught', () => {
        let input = [
            {
                'year': 2014,
                'term': "W1",
                'instructorName': "Justin Bieber",
                'PUID': 5555,
                'enrolment': 52
            },
            {
                'year': 2013,
                'term': "W1",
                'instructorName': "Justin Bieber",
                'PUID': 5555,
                'enrolment': 100
            },
            {
                'year': 2014,
                'term': "W2",
                'instructorName': "Blessie",
                'PUID': 8080,
                'enrolment': 50
            },
            {
                'year': 2013,
                'term': "W2",
                'instructorName': "Blessie",
                'PUID': 8080,
                'enrolment': 88
            },
            {
                'year': 2012,
                'term': "S1",
                'instructorName': "Justin Bieber",
                'PUID': 5555,
                'enrolment': 60
            }
        ]
        let output = [
            {
                'name': "Blessie",
                'PUID': 8080,
                'terms': ["2013W2", "2014W2"]
            },
            {
                'name': "Justin Bieber",
                'PUID': 5555,
                'terms': ["2012S1", "2013W1", "2014W1"]
            }
        ]
        assert.deepEqual(createInstructorData(input), output)
    })
    describe('createMetaData', () => {
        it('takes a array of courses and provides the appropriate metadata', () => {
            let input = [
                {
                    'year': 2014,
                    'term': "W1",
                    'instructorName': "Justin Bieber",
                    'PUID': 5555,
                    'enrolment': 52,
                    'dept': "FNH"
                },
                {
                    'year': 2013,
                    'term': "W1",
                    'instructorName': "Justin Bieber",
                    'PUID': 5555,
                    'enrolment': 100,
                    'dept': "FNH"
                },
                {
                    'year': 2014,
                    'term': "W2",
                    'instructorName': "Blessie",
                    'PUID': 8080,
                    'enrolment': 50,
                    'dept': "LFS"
                },
                {
                    'year': 2013,
                    'term': "W2",
                    'instructorName': "Blessie",
                    'PUID': 8080,
                    'enrolment': 88,
                    'dept': "FNH"
                },
                {
                    'year': 2012,
                    'term': "S1",
                    'instructorName': "Justin Bieber",
                    'PUID': 5555,
                    'enrolment': 60,
                    'dept': "KKK"
                }
            ]
            let output = [{
                'years': [{
                    'year': 2012,
                    'minClassSize': 60,
                    'maxClassSize': 60
                },
                {
                    'year': 2013,
                    'minClassSize': 88,
                    'maxClassSize': 100
                },
                {
                    'year': 2014,
                    'minClassSize': 50,
                    'maxClassSize': 52
                }
                ]
            , 'terms': ["S1", "W1", "W2"] ,  'depts': ["FNH", "KKK", "LFS"], 
                'instructors':
                    [
                        {
                            'name': "Blessie",
                            'PUID': 8080,
                            'terms': ["2013W2", "2014W2"]
                        },
                        {
                            'name': "Justin Bieber",
                            'PUID': 5555,
                            'terms': ["2012S1", "2013W1", "2014W1"]
                        }
                    ]
            }]
            assert.deepEqual(createMetaData(input), output)
        })
    })
})  