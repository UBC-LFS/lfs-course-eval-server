import R from 'ramda'
import * as get from './get'
import * as filter from './filter'


const toTwoDecimal = (decimal) => Math.round(decimal * 100) / 100

// all inputs below take an array of objects as the last argument
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


const percentileRankingOfCourse = (courseNum, year, term, arr) => {
     
}

const dispersionIndexOfCourse = (courseNum, year, term, arr) => {
    
}

const umiAvgOfCourse = (courseNum, year, term, umi, arr) => 
    R.pipe(
        filter.bySpecificCourse(courseNum, year, term),
        get.arrayOfUmi(umi),
        x => avg(x)
    )(arr)


const dispersionIndexOfInstructor = (instructorName, arr) => {

}

// this won't work when instructors have the same name. probably will need to group by instructor PUID
const percentileRankingOfInstrutor = (instructorName, umi, arr) => {
    const arrOfInstructorUMI = get.arrayOfUmi(umi, filter.byInstructor(instructorName)(arr))
    const arrWithoutInstructor = get.arrayOfUmi(umi, (R.filter(x => x.instructor !== instructorName)(arr)))

    const umiAvgOfInstructor = avg(arrWithInstructor)
    const umiAvgOfEveryoneElse = avg(arrWithInstructor)

    return R.pipe(

        x => toTwoDecimal(x),
        x => get.percentFromDecimal(x)
    )
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
    umiAvgOfInstructor,
    umiAvgOfCourse
}