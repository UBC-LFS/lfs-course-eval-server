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

// calculate UMI dispersion
const dispersionIndex = (arr, umi) => {
    const arrOfUMI = get.arrayOfUMI(umi)(arr)
    const numberOfResponses = arrOfUMI.length
    const countUMI = R.countBy(x => x, arrOfUMI)

    const keysInCountUMI = R.keys(countUMI).sort()
    const numberOfKeys = keysInCountUMI.length
    // calculate proportion
    for (let umiKey in countUMI) {
        countUMI[umiKey] = {
            count: countUMI[umiKey],
            proportion: countUMI[umiKey]/numberOfResponses
        }
    }
    
    // calculate 1 - cumulativeProportion
    for (let umiKey in countUMI) {
        if (umiKey === keysInCountUMI[0]) {
            countUMI[umiKey].oneMinusCumulativeProportion = 1 - countUMI[umiKey].proportion
        } else countUMI[umiKey].oneMinusCumulativeProportion = (1 - (countUMI[umiKey].proportion + countUMI[keysInCountUMI[numberOfKeys-1]].proportion))
    }

    console.log(countUMI)
}

const percentileRankingOfCourse = (courseNum, year, term, arr) => {
     
}

const umiAvgOfCourse = (courseNum, year, term, umi, arr) => 
    R.pipe(
        filter.bySpecificCourse(courseNum, year, term),
        get.arrayOfUMI(umi),
        x => avg(x)
    )(arr)



// this won't work when instructors have the same name. probably will need to group by instructor PUID
const percentileRankingOfInstrutor = (instructorName, umi, arr) => {
    const arrOfInstructorUMI = get.arrayOfUMI(umi, filter.byInstructor(instructorName)(arr))
    const arrWithoutInstructor = get.arrayOfUMI(umi, (R.filter(x => x.instructor !== instructorName)(arr)))

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
        get.arrayOfUMI(umi),
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
    dispersionIndex,
    umiAvgOfInstructor,
    umiAvgOfCourse
}