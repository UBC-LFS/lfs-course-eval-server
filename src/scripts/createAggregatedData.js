import fs from 'fs'
import parse from 'csv-parse'
import * as calculate from '../utils/calculate'
import * as getFromCSV from './scriptUtils/getFromCSV'
import R from 'ramda'

const readCSV = (filename, callback) => {
    const parser = parse({delimiter: ',', columns: true, relax: true, auto_parse: true}, (
        err, data) => {
            if (err) throw err
            callback(data)
    })
    fs.createReadStream(__dirname + '/source/' + filename).pipe(parser)
}

const createCourseObj = (csv) => {
    return csv.reduce((acc, ev) => {
        const year = getFromCSV.getYear(ev)
        const term = getFromCSV.getTerm(ev)
        const course = getFromCSV.getCourse(ev)
        const section = getFromCSV.getSection(ev)
        const courseName = getFromCSV.getCourseName(ev)
        const coureseLevel = getFromCSV.getCourseLevel(ev)
        const dept = getFromCSV.getDept(ev)
        const instructorName = getFromCSV.getInstructorName(ev)
        const PUID = getFromCSV.getPUID(ev)
        const gender = getFromCSV.getGender(ev)

        const uniqSectionInTerm = (x) => (x.year === year 
            && x.course === course 
            && x.term === term 
            && x.section === section
            && x.instructorName === instructorName)

        if (acc.some(x => uniqSectionInTerm(x))) {
            const index = acc.findIndex(x => uniqSectionInTerm(x))
            // umi count 
            if (typeof (acc[index].UMI1.count[getFromCSV.getUMI1(ev)]) == 'undefined') {
                acc[index].UMI1.count = { ...acc[index].UMI1.count, [getFromCSV.getUMI1(ev)]: 1 }
            } else acc[index].UMI1.count[getFromCSV.getUMI1(ev)] = acc[index].UMI1.count[getFromCSV.getUMI1(ev)] + 1

            if (typeof (acc[index].UMI2.count[getFromCSV.getUMI2(ev)]) == 'undefined') {
                acc[index].UMI2.count = { ...acc[index].UMI2.count, [getFromCSV.getUMI2(ev)]: 1 }
            } else acc[index].UMI2.count[getFromCSV.getUMI2(ev)] = acc[index].UMI2.count[getFromCSV.getUMI2(ev)] + 1

            if (typeof (acc[index].UMI3.count[getFromCSV.getUMI3(ev)]) == 'undefined') {
                acc[index].UMI3.count = { ...acc[index].UMI3.count, [getFromCSV.getUMI3(ev)]: 1 }
            } else acc[index].UMI3.count[getFromCSV.getUMI3(ev)] = acc[index].UMI3.count[getFromCSV.getUMI3(ev)] + 1

            if (typeof (acc[index].UMI4.count[getFromCSV.getUMI4(ev)]) == 'undefined') {
                acc[index].UMI4.count = { ...acc[index].UMI4.count, [getFromCSV.getUMI4(ev)]: 1 }
            } else acc[index].UMI4.count[getFromCSV.getUMI4(ev)] = acc[index].UMI4.count[getFromCSV.getUMI4(ev)] + 1

            if (typeof (acc[index].UMI5.count[getFromCSV.getUMI5(ev)]) == 'undefined') {
                acc[index].UMI5.count = { ...acc[index].UMI5.count, [getFromCSV.getUMI5(ev)]: 1 }
            } else acc[index].UMI5.count[getFromCSV.getUMI5(ev)] = acc[index].UMI5.count[getFromCSV.getUMI5(ev)] + 1

            if (typeof (acc[index].UMI6.count[getFromCSV.getUMI6(ev)]) == 'undefined') {
                acc[index].UMI6.count = { ...acc[index].UMI6.count, [getFromCSV.getUMI6(ev)]: 1}
            } else acc[index].UMI6.count[getFromCSV.getUMI6(ev)] = acc[index].UMI6.count[getFromCSV.getUMI6(ev)] + 1

            acc[index].gender[gender] = acc[index].gender[gender] + 1

            return acc
            
        } else {
            acc.push({
                year,
                term, 
                course,
                section,
                courseName, 
                coureseLevel,
                dept,
                instructorName,
                PUID,
                gender: {
                    Female: (gender==='Female') ?  1 : 0,
                    Male: (gender==='Male') ? 1 : 0
                },
                UMI1: {
                    count: {
                        [String(getFromCSV.getUMI1(ev))]: 1
                    }
                },
                UMI2: {
                    count: {
                        [String(getFromCSV.getUMI2(ev))]: 1
                    }
                },
                UMI3: {
                    count: {
                        [String(getFromCSV.getUMI3(ev))]: 1
                    }
                },
                UMI4: {
                    count: {
                        [String(getFromCSV.getUMI4(ev))]: 1
                    }
                },
                UMI5: {
                    count: {
                        [String(getFromCSV.getUMI5(ev))]: 1
                    }
                },
                UMI6: {
                    count: {
                        [String(getFromCSV.getUMI6(ev))]: 1
                    }
                }
            })
            return acc
        }
    }, [])
}

const insertDispersionIndex = (courseObj) => {
    courseObj.UMI1.dispersionIndex = calculate.dispersionIndex(courseObj.UMI1.count)
    courseObj.UMI2.dispersionIndex = calculate.dispersionIndex(courseObj.UMI2.count)
    courseObj.UMI3.dispersionIndex = calculate.dispersionIndex(courseObj.UMI3.count)
    courseObj.UMI4.dispersionIndex = calculate.dispersionIndex(courseObj.UMI4.count)
    courseObj.UMI5.dispersionIndex = calculate.dispersionIndex(courseObj.UMI5.count)
    courseObj.UMI6.dispersionIndex = calculate.dispersionIndex(courseObj.UMI6.count)
    return courseObj
}

const insertAvg = (courseObj) => {
    courseObj.UMI1.average = calculate.umiAvg(courseObj.UMI1.count)
    courseObj.UMI2.average = calculate.umiAvg(courseObj.UMI2.count)
    courseObj.UMI3.average = calculate.umiAvg(courseObj.UMI3.count)
    courseObj.UMI4.average = calculate.umiAvg(courseObj.UMI4.count)
    courseObj.UMI5.average = calculate.umiAvg(courseObj.UMI5.count)
    courseObj.UMI6.average = calculate.umiAvg(courseObj.UMI6.count)
    return courseObj
}

const insertPercentFav = (courseObj) => {
    courseObj.UMI1.percentFavourable = calculate.percentFavourable(courseObj.UMI1.count)
    courseObj.UMI2.percentFavourable = calculate.percentFavourable(courseObj.UMI2.count)
    courseObj.UMI3.percentFavourable = calculate.percentFavourable(courseObj.UMI3.count)
    courseObj.UMI4.percentFavourable = calculate.percentFavourable(courseObj.UMI4.count)
    courseObj.UMI5.percentFavourable = calculate.percentFavourable(courseObj.UMI5.count)
    courseObj.UMI6.percentFavourable = calculate.percentFavourable(courseObj.UMI6.count)
    return courseObj
}

const insertPercentileRanking = (courseObjs) => {
    const sortedByUMI1Avg = R.compose(
        R.sort((a, b) => a.UMI1.average - b.UMI1.average)
    )(courseObjs)
    sortedByUMI1Avg.map((course) => {
        const filteredByTerm = sortedByUMI1Avg.filter(x => x.year === course.year && x.term === course.term)
        const filteredByDept = filteredByTerm.filter(x => x.dept === course.dept)
        course.UMI1.percentileRankingByFaculty = calculate.percentileRankingOfCourse(course, 'UMI1', filteredByTerm)
        course.UMI1.percentileRankingByDept = calculate.percentileRankingOfCourse(course, 'UMI1', filteredByDept)
    })

    const sortedByUMI2Avg = R.compose(
        R.sort((a, b) => a.UMI2.average - b.UMI2.average)
    )(sortedByUMI1Avg)
    sortedByUMI2Avg.map((course) => {
        const filteredByTerm = sortedByUMI2Avg.filter(x => x.year === course.year && x.term === course.term)
        const filteredByDept = filteredByTerm.filter(x => x.dept === course.dept)
        course.UMI2.percentileRankingByFaculty = calculate.percentileRankingOfCourse(course, 'UMI2', filteredByTerm)
        course.UMI2.percentileRankingByDept = calculate.percentileRankingOfCourse(course, 'UMI2', filteredByDept)
    })

    const sortedByUMI3Avg = R.compose(
        R.sort((a, b) => a.UMI3.average - b.UMI3.average)
    )(sortedByUMI2Avg)
    sortedByUMI3Avg.map((course) => {
        const filteredByTerm = sortedByUMI2Avg.filter(x => x.year === course.year && x.term === course.term)
        const filteredByDept = filteredByTerm.filter(x => x.dept === course.dept)
        course.UMI3.percentileRankingByFaculty = calculate.percentileRankingOfCourse(course, 'UMI3', filteredByTerm)
        course.UMI3.percentileRankingByDept = calculate.percentileRankingOfCourse(course, 'UMI3', filteredByDept)
    })

    const sortedByUMI4Avg = R.compose(
        R.sort((a, b) => a.UMI4.average - b.UMI4.average)
    )(sortedByUMI3Avg)
    sortedByUMI4Avg.map((course) => {
        const filteredByTerm = sortedByUMI4Avg.filter(x => x.year === course.year && x.term === course.term)
        const filteredByDept = filteredByTerm.filter(x => x.dept === course.dept)
        course.UMI4.percentileRankingByFaculty = calculate.percentileRankingOfCourse(course, 'UMI4', filteredByTerm)
        course.UMI4.percentileRankingByDept = calculate.percentileRankingOfCourse(course, 'UMI4', filteredByDept)
    })

    const sortedByUMI5Avg = R.compose(
        R.sort((a, b) => a.UMI5.average - b.UMI5.average)
    )(sortedByUMI4Avg)
    sortedByUMI5Avg.map((course) => {
        const filteredByTerm = sortedByUMI5Avg.filter(x => x.year === course.year && x.term === course.term)
        const filteredByDept = filteredByTerm.filter(x => x.dept === course.dept)
        course.UMI5.percentileRankingByFaculty = calculate.percentileRankingOfCourse(course, 'UMI5', filteredByTerm)
        course.UMI5.percentileRankingByDept = calculate.percentileRankingOfCourse(course, 'UMI5', filteredByDept)
    })

    const sortedByUMI6Avg = R.compose(
        R.sort((a, b) => a.UMI6.average - b.UMI6.average)
    )(sortedByUMI5Avg)
    sortedByUMI6Avg.map((course) => {
        const filteredByTerm = sortedByUMI6Avg.filter(x => x.year === course.year && x.term === course.term)
        const filteredByDept = filteredByTerm.filter(x => x.dept === course.dept)
        course.UMI6.percentileRankingByFaculty = calculate.percentileRankingOfCourse(course, 'UMI6', filteredByTerm)
        course.UMI6.percentileRankingByDept = calculate.percentileRankingOfCourse(course, 'UMI6', filteredByDept)
    })

    return sortedByUMI6Avg
}
// crsnum is the unique identifier for a given year. 
readCSV('mockRawData.csv', (csv) => {
    //console.log(csv)
    const courseObjs = createCourseObj(csv)

    courseObjs.map(courseObj => {
        return R.pipe(
            x => insertDispersionIndex(x),
            x => insertAvg(x),
            x => insertPercentFav(x)
        )(courseObj)
    }) 

    const courseObjWithPercentileRanking = insertPercentileRanking(courseObjs)

    //console.log(JSON.stringify(courseObjWithPercentileRanking, null, 2))
    
    //console.log(calculate.percentileRankingOfCourse(sortedByUMI1Avg[sortedByUMI1Avg.length-1], 'UMI1', sortedByUMI1Avg))


    
})

export {
    createCourseObj,
    insertDispersionIndex,
    insertAvg,
    insertPercentFav,
    insertPercentileRanking
}