import * as filter from '../utils/filter'
import readCSV from './readCSV'
import R from 'ramda'

const filterDataByFilterSettings = ({ chartKey, year, term, code, courseLevel, dept, toggle, minClassSize, classSizeMax }) => {
    // what to do with chartkey?

    // filter according to params sent by client
    const filterPipeline = (data) => {
        // filters go in here
        // return R.pipe(

        // )
        console.log(data)
        return data
    }
    return new Promise((resolve, reject) => {
        // specify what file or eventually DB to connect to
        readCSV('mockRawData.csv', (data) => {
            if (data) {
                resolve(filterPipeline(data))
            } else reject(data)
        })
    })
}

export {
    filterDataByFilterSettings
}