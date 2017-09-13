import R from 'ramda'
import * as get from './get'
import * as filter from './filter'

const avg = (arr) => R.mean(arr)

const median = (arr) => R.median(arr)

const toTwoDecimal = (decimal) => Math.round(decimal * 100) / 100

const percentFavourable = (arr) => {
    if (arr.length === 0) return 0
    const fourAndFive = arr.filter(x => x >= 4)
    return fourAndFive.length / arr.length
} 

const percentGender = (gender, arr) => {
    const countOfSpecifiedGender = arr.filter(x => x.gender === gender).length
    return countOfSpecifiedGender / arr.length
}


const percentileRankingOfCourse = (courseName, arr) => {

}

const dispersionIndexOfCourse = (courseNum, year, term, arr) => {
    
}

const dispersionIndexOfInstructor = (instructorName, arr) => {

}

const percentileRankingOfInstrutor = (instructorName, arr) => {
    
}

const umiAvgOfInstructor = (instructorName, umi, arr) => 
    R.pipe(
        filter.byInstructor(instructorName),
        get.arrayOfUmi(umi),
        x => avg(x)
    )(arr)

export {
    avg,
    median,
    percentFavourable,
    percentGender,
    toTwoDecimal,
    percentileRankingOfCourse,
    percentileRankingOfInstrutor,
    dispersionIndexOfCourse,
    dispersionIndexOfInstructor,
    umiAvgOfInstructor
}