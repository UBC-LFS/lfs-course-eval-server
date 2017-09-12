import R from 'ramda'

const sliceYear = (yearWithTerm) => Number(yearWithTerm.slice(0,4))
const sliceTerm = (yearWithTerm) => yearWithTerm.slice(4,6)

const arrayOfUmi = (umi) => R.map(x => x[umi])

const arrayOfGender = R.map(x => x.gender)

const percentFromDecimal = (decimal) => decimal * 100 + '%'

const instructorFirstName = (name) => name.split(' ')[1]
const instructorLastName = (name) => name.split(',')[0]

export {
    sliceYear,
    sliceTerm,
    arrayOfUmi,
    arrayOfGender,
    percentFromDecimal,
    instructorFirstName,
    instructorLastName
}