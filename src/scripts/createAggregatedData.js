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

        const uniqSectionInTerm = (x) => (x.year === year && x.course === course && x.term === term)
        if (acc.some(x => uniqSectionInTerm(x))) {
            const index = acc.findIndex(x => uniqSectionInTerm(x))
            acc[index].UMI1.count[String(getFromCSV.getUMI1(ev))] = acc[index].UMI1.count[String(getFromCSV.getUMI1(ev))] + 1
            acc[index].UMI2.count[String(getFromCSV.getUMI2(ev))] = acc[index].UMI2.count[String(getFromCSV.getUMI2(ev))] + 1
            acc[index].UMI3.count[String(getFromCSV.getUMI3(ev))] = acc[index].UMI3.count[String(getFromCSV.getUMI3(ev))] + 1
            acc[index].UMI4.count[String(getFromCSV.getUMI4(ev))] = acc[index].UMI4.count[String(getFromCSV.getUMI4(ev))] + 1
            acc[index].UMI5.count[String(getFromCSV.getUMI5(ev))] = acc[index].UMI5.count[String(getFromCSV.getUMI5(ev))] + 1
            acc[index].UMI6.count[String(getFromCSV.getUMI6(ev))] = acc[index].UMI6.count[String(getFromCSV.getUMI6(ev))] + 1
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
    console.log(JSON.stringify(reduced, null, 2))
    // csv.map(ev => {
        // const year = getFromCSV.getYear(ev)
        // const term = getFromCSV.getTerm(ev)
        // const course = getFromCSV.getCourse(ev)
        // const section = getFromCSV.getSection(ev)
        // const courseName = getFromCSV.getCourseName(ev)
        // const coureseLevel = getFromCSV.getCourseLevel(ev)
        // const dept = getFromCSV.getDept(ev)

    //     const thisCourse = csv.filter(x => getFromCSV.getYear(x) === year && getFromCSV.getCourse(x) === course)

    //     // course size doesn't exist?
    //     //const responseRate = 
    //     const instructorName = getFromCSV.getInstructorName(ev)

    //     const allOtherCoursesInTerm = csv.filter(x => getFromCSV.getYear(x) === year && getFromCSV.getTerm(x) === term)
        
    // })
})

