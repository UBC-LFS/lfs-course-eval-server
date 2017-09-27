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



// crsnum is the unique identifier for a given year. 
readCSV('mockRawData.csv', (csv) => {
    const reduced = csv.reduce((acc, ev) => {
        const year = getFromCSV.getYear(ev)
        const term = getFromCSV.getTerm(ev)
        const course = getFromCSV.getCourse(ev)
        const section = getFromCSV.getSection(ev)
        const courseName = getFromCSV.getCourseName(ev)
        const coureseLevel = getFromCSV.getCourseLevel(ev)
        const dept = getFromCSV.getDept(ev)
        const instructorName = getFromCSV.getInstructorName(ev)
        const PUID = getFromCSV.getPUID(ev)

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

            // gender count
            // if (typeof acc[index].gender[getFromCSV.getGender(ev)] == 'undefined') {
            //     acc[index].gender = { ...acc[index].gender, [getFromCSV.getGender(ev)]: 1 }
            //} else 
            acc[index].gender[getFromCSV.getGender(ev)] = acc[index].gender[getFromCSV.getGender(ev)] + 1

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
                    Female: 0,
                    Male: 0
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

    reduced.map(courseObj => {
        // insert dispersion
        courseObj.UMI1.dispersionIndex = calculate.dispersionIndexV2(courseObj.UMI1.count)
        courseObj.UMI2.dispersionIndex = calculate.dispersionIndexV2(courseObj.UMI2.count)
        courseObj.UMI3.dispersionIndex = calculate.dispersionIndexV2(courseObj.UMI3.count)
        courseObj.UMI4.dispersionIndex = calculate.dispersionIndexV2(courseObj.UMI4.count)
        courseObj.UMI5.dispersionIndex = calculate.dispersionIndexV2(courseObj.UMI5.count)
        courseObj.UMI6.dispersionIndex = calculate.dispersionIndexV2(courseObj.UMI6.count)
        // insert avg
        courseObj.UMI1.average = calculate.umiAvgV2(courseObj.UMI1.count)
        courseObj.UMI2.average = calculate.umiAvgV2(courseObj.UMI2.count)
        courseObj.UMI3.average = calculate.umiAvgV2(courseObj.UMI3.count)
        courseObj.UMI4.average = calculate.umiAvgV2(courseObj.UMI4.count)
        courseObj.UMI5.average = calculate.umiAvgV2(courseObj.UMI5.count)
        courseObj.UMI6.average = calculate.umiAvgV2(courseObj.UMI6.count)
    }) 

    console.log(JSON.stringify(reduced, null, 2))
    
})

