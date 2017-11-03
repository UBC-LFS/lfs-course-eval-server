import R from 'ramda'
import * as get from './get'

const byYearThenTerm = (arr) => {
  const order = {
    'S1': 0,
    'SA': 1,
    'S2': 2,
    'W1': 3,
    'WA': 4,
    'W2': 5,
    'WC': 6
  }
  return R.sort((a, b) => {
    if (get.sliceYear(a) === get.sliceYear(b)) {
      return (order[get.sliceTerm(a)] < order[get.sliceTerm(b)]) ? -1
                     : (order[get.sliceTerm(a)] > order[get.sliceTerm(b)]) ? 1 : 0
    } else return (get.sliceYear(a) < get.sliceYear(b) ? -1 : 1)
  }, arr)
}

const byInstructorLastName = (arr) => {
  return arr.sort((a, b) => {
    const aLastName = get.instructorLastName(a.instructor).toLowerCase()
    const bLastName = get.instructorLastName(b.instructor).toLowerCase()
    if (aLastName < bLastName) return -1
    if (aLastName > bLastName) return 1
    else return 0
  })
}

export {
    byYearThenTerm,
    byInstructorLastName
}
