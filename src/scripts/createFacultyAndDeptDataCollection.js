import R from 'ramda'
import { umiAvg, sumCount } from '../utils/calculate'
import assert from 'assert'
import jsonfile from 'jsonfile'
import * as collection from '../utils/constants'

const createAverageDept = data => {
    const departments = R.uniq(data
        .map(section => section.dept)
        )
    const filteredByDept = departments
        .map(dept => data
            .filter(section => section.dept === dept))
    const calculateAverage = filteredByDept.map(deptSections => {
        const deptObj = {
            'department': deptSections[0].dept
        }
        const splitIntoTerms = deptSections.reduce((acc, section) => {
            const year = section.year
            const term = section.term
            const key = year + term

            const object = acc.find(obj => obj.hasOwnProperty(key))
            if (object) {
                object[key].push(section)
            } else {
                const newObj = {
                    [key]: [section]
                }
                acc.push(newObj)
            }
            return acc
        }, [])

        const dataObj = splitIntoTerms
            .map(section => {
                // console.log(Object.values(section)[0])
                return Object.values(section)[0]
            })
            .map(sections => {
                return {
                    'term': sections[0].term,
                    'year': sections[0].year,
                    'UMI1': umiAvg(sumCount(sections.map(section => section.UMI1.count))),
                    'UMI2': umiAvg(sumCount(sections.map(section => section.UMI2.count))),
                    'UMI3': umiAvg(sumCount(sections.map(section => section.UMI3.count))),
                    'UMI4': umiAvg(sumCount(sections.map(section => section.UMI4.count))),
                    'UMI5': umiAvg(sumCount(sections.map(section => section.UMI5.count))),
                    'UMI6': umiAvg(sumCount(sections.map(section => section.UMI6.count))),
                    'length': sections.length
                }
            })
        deptObj.data = dataObj
        return deptObj
    })
    return calculateAverage
}

const createAverageFaculty = data => {
    const facultyObj = {
        'department': 'faculty'
    }
    const splitIntoTermsFaculty = data.reduce((acc, section) => {
        const year = section.year
        const term = section.term
        const key = year + term

        const object = acc.find(obj => obj.hasOwnProperty(key))
        if (object) {
            object[key].push(section)
        } else {
            const newObj = {
                [key]: [section]
            }
            acc.push(newObj)
        }
        return acc
    }, [])

    const facultyDataObj = splitIntoTermsFaculty
        .map(section => {
            // console.log(Object.values(section)[0])
            return Object.values(section)[0]
        })
        .map(sections => {
            return {
                'term': sections[0].term,
                'year': sections[0].year,
                'UMI1': umiAvg(sumCount(sections.map(section => section.UMI1.count))),
                'UMI2': umiAvg(sumCount(sections.map(section => section.UMI2.count))),
                'UMI3': umiAvg(sumCount(sections.map(section => section.UMI3.count))),
                'UMI4': umiAvg(sumCount(sections.map(section => section.UMI4.count))),
                'UMI5': umiAvg(sumCount(sections.map(section => section.UMI5.count))),
                'UMI6': umiAvg(sumCount(sections.map(section => section.UMI6.count))),
                'length': sections.length
            }
        })
    facultyObj.data = facultyDataObj
    return facultyObj
}

const createAverage = (json) => {
    const deptResult = createAverageDept(json)
    const facultyResult = createAverageFaculty(json)
    return deptResult.concat(facultyResult)
}

const outputFacultyDeptData = () => {
    jsonfile.readFile('./output/' + collection.aggregatedData + '.json', (err, json) => {
        assert.equal(null, err)
        const file = './output/' + collection.facultyDeptData + '.json'
        const result = createAverage(json)
        jsonfile.writeFile(file, result, (err) => assert.equal(null, err))
    })
}

export {
    createAverage,
    outputFacultyDeptData
}