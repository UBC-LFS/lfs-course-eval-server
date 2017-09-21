import * as filter from '../utils/filter'
import readCSV from './readCSV'
import R from 'ramda'

const filterDataByFilterSettings = ({ chartKey, year, term, courseNum, department, toggleBelowMin, classSizeMin, classSizeMax }) => {
    // what to do with chartkey?
    console.log(chartKey, year, term, courseNum, department, toggleBelowMin, classSizeMin, classSizeMax)
    // filter according to params sent by client
    const filterPipeline = (data) => {
        // filters go in here
        // TODO: fix filter function
        const filterData = R.pipe(
            // filter.byYear(year),
            // filter.byTerm(term),
            // filter.byCourseNum(courseNum),
            // filter.byDept(dept),
            filter.byClassSize(classSizeMin, classSizeMax),
            filter.byToggle(toggleBelowMin)
        )(data)
        console.log(filterData)
        return filterData
    }

    return new Promise((resolve, reject) => {
        // specify what file or eventually DB to connect to
        readCSV('mockAggregatedData.csv', (data) => {
            if (data) {
                resolve(filterPipeline(data))
            } else reject(data)
        })
    })
}

export {
    filterDataByFilterSettings
}