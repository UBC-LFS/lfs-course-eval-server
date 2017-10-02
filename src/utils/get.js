import R from 'ramda'

const sliceYear = (yearWithTerm) => Number(yearWithTerm.slice(0, 4))
const sliceTerm = (yearWithTerm) => yearWithTerm.slice(4, 6)

const arrayOfUMI = (umi) => R.pipe(
        R.filter(x => x.hasOwnProperty(umi)),
        R.map(R.prop(umi))
    )

const arrayOfGender = R.map(R.prop('gender'))

const percentFromDecimal = (decimal) => decimal * 100 + '%'

const instructorFirstName = (name) => name.split(' ')[1]
const instructorLastName = (name) => name.split(',')[0]

const courseLevel = (courseNum) => Math.floor(Number(courseNum.split(' ')[1]) / 100) * 100

const uniqYears = R.pipe(
    R.map(x => sliceYear(x.term)),
    R.uniq(),
    R.sort((a, b) => a - b)
)

const uniqTerms = R.pipe(
    R.map(x => sliceTerm(x.term)),
    R.uniq(),
    R.sort((a, b) => a - b)
)

const uniqCourseLevels = R.pipe(
    R.map(x => courseLevel(x.courseNum)),
    R.uniq(),
    R.sort((a, b) => a - b)
)

const uniqDepts = R.pipe(
    R.map(x => x.deptName),
    R.uniq(),
    R.sort((a, b) => a - b)
)

export {
    sliceYear,
    sliceTerm,
    arrayOfUMI,
    arrayOfGender,
    percentFromDecimal,
    instructorFirstName,
    instructorLastName,
    courseLevel,
    uniqYears,
    uniqTerms,
    uniqCourseLevels,
    uniqDepts
}
