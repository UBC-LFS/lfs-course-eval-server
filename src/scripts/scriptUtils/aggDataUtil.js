import R from 'ramda'

const filterByEnrolment = (lower, upper) => R.filter(section => section.enrolment >= lower && section.enrolment <= upper)

const filterByYears = (start, end) => R.filter(section => section.year >= start && section.year <= end)

export {
  filterByEnrolment,
  filterByYears
}
