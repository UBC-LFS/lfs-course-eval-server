/* global describe, it */
import assert from 'assert'
import * as sort from '../src/utils/sort'

describe('byYearThenTerm', () => {
  it('takes an empty array and returns an empty array', () => {
    const input = []
    const expected = []
    assert.deepEqual(expected, sort.byYearThenTerm(input))
  })
  it('takes an array and returns the sorted version of the array by year and term', () => {
    const input = ['2009W1', '2009W2', '2010W1', '2010W2', '2011W2', '2011W1', '2012W1', '2012W2', '2013SA', '2013WA', '2013W1', '2013W2', '2014SA', '2014W2', '2016W2', '2016W1']
    const expected = ['2009W1', '2009W2', '2010W1', '2010W2', '2011W1', '2011W2', '2012W1', '2012W2', '2013SA', '2013W1', '2013WA', '2013W2', '2014SA', '2014W2', '2016W1', '2016W2']
    assert.deepEqual(expected, sort.byYearThenTerm(input))
  })
  it('takes an array of 2 and sorts accordingly', () => {
    const simpleinput = ['2009W2', '2009W1']
    const expected = ['2009W1', '2009W2']
    assert.deepEqual(expected, sort.byYearThenTerm(simpleinput))
  })
  it('takes an array of 3 with different years and sorts accordingly', () => {
    const input = ['2009W2', '2009W1', '2010SA']
    const expected = ['2009W1', '2009W2', '2010SA']
    assert.deepEqual(expected, sort.byYearThenTerm(input))
  })
  it('takes an array of 4 with different years but same terms and sorts accorindgly', () => {
    const input = ['2017WC', '2015WC', '2011WC', '2013WC']
    const expected = ['2011WC', '2013WC', '2015WC', '2017WC']
    assert.deepEqual(expected, sort.byYearThenTerm(input))
  })
  it('takes an array of 7 with same year but different terms and sorts accordingly', () => {
    const input = ['2011WC', '2011S2', '2011S1', '2011W2', '2011SA', '2011WA', '2011W1']
    const expected = ['2011S1', '2011SA', '2011S2', '2011W1', '2011WA', '2011W2', '2011WC']
    assert.deepEqual(expected, sort.byYearThenTerm(input))
  })
  it('takes an array of 9 with different years and various terms, sorts accordingly', () => {
    const input = ['2015W1', '2009WC', '2016W1', '2020W1', '2016W2', '2011S2', '2009WA', '2017S2', '2011S1']
    const expected = ['2009WA', '2009WC', '2011S1', '2011S2', '2015W1', '2016W1', '2016W2', '2017S2', '2020W1']
    assert.deepEqual(expected, sort.byYearThenTerm(input))
  })
})

describe('byInstructorLastName', () => {
  it('sorts an array of objects by instructor last name', () => {
    const input = [
            { instructor: 'Abe, John' },
            { instructor: 'Boe, John' },
            { instructor: 'Boe, John' },
            { instructor: 'Coe, John' },
            { instructor: 'Doe, John' },
            { instructor: 'Doe, John' },
            { instructor: 'Eoe, John' },
            { instructor: 'Foe, John' },
            { instructor: 'Goe, John' },
            { instructor: 'Hoe, John' },
            { instructor: 'Ioe, John' }
    ]
    const output = [
            { instructor: 'Abe, John' },
            { instructor: 'Boe, John' },
            { instructor: 'Boe, John' },
            { instructor: 'Coe, John' },
            { instructor: 'Doe, John' },
            { instructor: 'Doe, John' },
            { instructor: 'Eoe, John' },
            { instructor: 'Foe, John' },
            { instructor: 'Goe, John' },
            { instructor: 'Hoe, John' },
            { instructor: 'Ioe, John' }
    ]
    assert.deepEqual(sort.byInstructorLastName(input), output)

    const input2 = [
            { instructor: 'Ioe, John' },
            { instructor: 'Goe, John' },
            { instructor: 'Hoe, John' },
            { instructor: 'Coe, John' },
            { instructor: 'Doe, John' },
            { instructor: 'Doe, John' },
            { instructor: 'Eoe, John' },
            { instructor: 'Foe, John' },
            { instructor: 'Abe, John' },
            { instructor: 'Boe, John' },
            { instructor: 'Boe, John' }
    ]
    assert.deepEqual(sort.byInstructorLastName(input2), output)
  })
})
