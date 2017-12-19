/* global describe, it */
import assert from 'assert'
import * as filter from '../src/utils/filter'

describe('removeIDs', () => {
  it('takes an array of objects with _id field and removes it', () => {
    let input = [
      { _id: '12334', other: 'hi' },
      { _id: '12334', other: 'there' },
      { _id: '12334', other: 'my' },
      { _id: '12334', other: 'name' },
      { _id: '12334', other: 'is' }
    ]
    let output = [
      { other: 'hi' },
      { other: 'there' },
      { other: 'my' },
      { other: 'name' },
      { other: 'is' }
    ]
    assert.deepEqual(output, filter.removeIDs(input))
  })
  it('can handle objects without _id field', () => {
    let input = [
      { other: 'hi' },
      { other: 'there' },
      { other: 'my' },
      { other: 'name' },
      { other: 'is' }
    ]
    let output = [
      { other: 'hi' },
      { other: 'there' },
      { other: 'my' },
      { other: 'name' },
      { other: 'is' }
    ]
    assert.deepEqual(output, filter.removeIDs(input))
  })
})
