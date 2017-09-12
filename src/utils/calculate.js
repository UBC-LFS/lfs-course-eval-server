import R from 'ramda'

const avg = (arr) => R.mean(arr)

const median = (arr) => R.median(arr)

const percentFavourable = (arr) => {
    if (arr.length === 0) return 0
    const fourAndFive = arr.filter(x => x >= 4)
    return fourAndFive.length / arr.length
} 

const percentGender = (gender, arr) => {
    const countOfSpecifiedGender = arr.filter(x => x.gender === gender).length
    return countOfSpecifiedGender / arr.length
}

const toTwoDecimal = (decimal) => Math.round(decimal * 100) / 100

export {
    avg,
    median,
    percentFavourable,
    percentGender,
    toTwoDecimal
}