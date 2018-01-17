import R from 'ramda'
import * as get from './get'

const byYearThenTerm = arr => {
  const order = {
    'S1': 0,
    'SA': 1,
    'S2': 2,
    'S': 3,
    'W1': 4,
    'WA': 5,
    'W2': 6,
    'WC': 7,
    'W': 8
  }
  return R.sort((a, b) => {
    if (get.sliceYear(a) === get.sliceYear(b)) {
      return (order[get.sliceTerm(a)] < order[get.sliceTerm(b)]) ? -1
           : (order[get.sliceTerm(a)] > order[get.sliceTerm(b)]) ? 1 : 0
    } else return (get.sliceYear(a) < get.sliceYear(b) ? -1 : 1)
  }, arr)
}

const sortByYearTerm = arr => {
  const order = {
    'S1': 0,
    'SA': 1,
    'S2': 2,
    'S': 3,
    'W1': 4,
    'WA': 5,
    'W2': 6,
    'WC': 7,
    'W': 8
  }
  return R.sort((a, b) => {
    if (a.yearTerm.slice(0, 4) === b.yearTerm.slice(0, 4)) {
      return (order[a.yearTerm.slice(4, 6)] < order[b.yearTerm.slice(4, 6)]) ? -1
        : (order[a.yearTerm.slice(4, 6)] > order[b.yearTerm.slice(4, 6)]) ? 1 : 0
    } else {
      return (a.yearTerm.slice(0, 4) < b.yearTerm.slice(0, 4) ? -1 : 1)
    }
  }, arr)
}

const byInstructorLastName = arr => arr.sort((a, b) => {
  const aLastName = get.instructorLastName(a.instructor).toLowerCase()
  const bLastName = get.instructorLastName(b.instructor).toLowerCase()
  if (aLastName < bLastName) return -1
  if (aLastName > bLastName) return 1
  else return 0
})

export {
    byYearThenTerm,
    byInstructorLastName,
    sortByYearTerm
}
