import R from 'ramda'

const sliceYear = (yearWithTerm) => Number(yearWithTerm.slice(0,4))
const sliceTerm = (yearWithTerm) => yearWithTerm.slice(4,6)

const arrayOfUMI = (umi) =>  R.pipe(
        R.filter(x => x.hasOwnProperty(umi)),
        R.map(R.prop(umi))
    )

const arrayOfGender = R.map(R.prop('gender'))

const percentFromDecimal = (decimal) => decimal * 100 + '%'

const instructorFirstName = (name) => name.split(' ')[1]
const instructorLastName = (name) => name.split(',')[0]

export {
    sliceYear,
    sliceTerm,
    arrayOfUMI,
    arrayOfGender,
    percentFromDecimal,
    instructorFirstName,
    instructorLastName
}