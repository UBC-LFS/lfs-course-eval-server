import * as filter from '../utils/filter'
import * as get from '../utils/get'
import readCSV from './readCSV'
import R from 'ramda'

const filterDataByFilterSettings = ({ chartKey, year, term, courseNum, department, toggleBelowMin, questionCode, classSizeMin, classSizeMax }, chartMapping) => {
    const filterPipeline = (data) => R.pipe(
            filter.byYear(year),
            filter.byTerm(get.sliceTerm(term)),
            filter.byCourseNum(courseNum),
            filter.byDept(department),
            filter.byClassSize(classSizeMin, classSizeMax),
            filter.byToggleBelowMin(toggleBelowMin),
            filter.selectFields(questionCode, chartMapping["Fields"])
        )(data)

    return new Promise((resolve, reject) => {
        // specify what file or eventually DB to connect to
        readCSV(chartMapping["DataSource"], (data) => {
            if (data) {
                console.log(data)
                resolve(filterPipeline(data))
            } else reject(data)
        })
    })
}

const filterData = () => {
    const filterObj = {
        years: [],
        terms: [],
        courseLevels: [],
        quetionCodes: [],
        depts: []
    }
    
    // const createFilterObj = (data) => {
    //     const years = 
    // }

    return new Promise((resolve, reject) => {
        readCSV('mockAggregatedData.csv', (data) => {
            if (data) {
                resolve(createFilterObj(data))
            }
        })
    })
}

export {
    filterDataByFilterSettings,
    filterData
}