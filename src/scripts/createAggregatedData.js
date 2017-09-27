import fs from 'fs'
import parse from 'csv-parse'
import * as calculate from '../utils/calculate'
import * as getFromCSV from './scriptUtils/getFromCSV'

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
    csv.map(ev => {
        const year = getFromCSV.getYear(ev)
        const term = getFromCSV.getTerm(ev)
        const course = getFromCSV.getCourse(ev)
        const section = getFromCSV.getSection(ev)
        const courseName = getFromCSV.getCourseName(ev)
        const coureseLevel = getFromCSV.getCourseLevel(ev)
        const dept = getFromCSV.getDept(ev)

        const thisCourse = csv.filter(x => getFromCSV.getYear(x) === year && getFromCSV.getCourse(x) === course)

        // course size doesn't exist?
        //const responseRate = 
        const instructorName = getFromCSV.getInstructorName(ev)

        const allOtherCoursesInTerm = csv.filter(x => getFromCSV.getYear(x) === year && getFromCSV.getTerm(x) === term)
        


        
    })
})

