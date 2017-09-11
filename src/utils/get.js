import R from 'ramda'

const sliceYear = (yearWithTerm) => Number(yearWithTerm.slice(0,4))
const sliceTerm = (yearWithTerm) => yearWithTerm.slice(4,6)

export {
    sliceYear
}