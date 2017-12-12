import R from 'ramda'

const filterByEnrolment = (lower, upper) => R.filter(section => section.enrolment >= lower && section.enrolment <= upper)

const filterByYears = (start, end) => R.filter(section => section.year >= start && section.year <= end)

const calculateEnrolment = data => data.reduce((acc, cur) => (acc += cur.enrolment), 0)

export {
  filterByEnrolment,
  filterByYears,
  calculateEnrolment
}
