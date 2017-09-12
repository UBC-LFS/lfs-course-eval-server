import R from 'ramda'

const sliceYear = (yearWithTerm) => Number(yearWithTerm.slice(0,4))
const sliceTerm = (yearWithTerm) => yearWithTerm.slice(4,6)

// takes an array of objects, returns array of specified UMI
const getUMI = (umi) => R.map(x => x.umi)


export {
    sliceYear,
    sliceTerm,
    getUMI
}