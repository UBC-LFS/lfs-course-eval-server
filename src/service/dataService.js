import * as filter from '../utils/filter'
import * as calculate from '../utils/calculate'
import * as get from '../utils/get'
import readCSV from './readCSV'
import R from 'ramda'

const filterDataByFilterSettings = ({ chartKey, year, term, courseNum, department, toggleBelowMin, questionCode, classSizeMin, classSizeMax }, chartMapping) => {
    const filterPipeline = (data) => {
        R.pipe(
                filter.byYear(year),
                filter.byTerm(term),
                filter.byCourseNum(courseNum),
                filter.byDept(department),
                filter.byClassSize(classSizeMin, classSizeMax),
                filter.byToggleBelowMin(toggleBelowMin),
                filter.selectFields(questionCode, chartMapping["Fields"])
            )(data)
        if (chartKey==='dashboard'){
            data["AvgRating"] = calculate.questionAvg(data)
            data["AvgClassSize"] = calculate.avgByField(data,"classSize")
        }
        return data
    }

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
    const createFilterObj = (data) => (
        {
            years: get.uniqYears(data),
            terms: get.uniqTerms(data),
            courseLevels: get.uniqCourseLevels(data),
            questionCodes: ['UMI1', 'UMI2', 'UMI3', 'UMI4', 'UMI5', 'UMI6'],
            depts: get.uniqDepts(data)
        }
    )

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