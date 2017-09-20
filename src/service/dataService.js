import * as filter from '../utils/filter'
import readCSV from './readCSV'

const filterDataByFilterSettings = ({ chartKey, year, term, code, courseLevel, dept, toggle, minClassSize, classSizeMax }) => {
    // filter according to params sent by client


    // specify what file or eventually DB to connect to
    readCSV('mockRawData.csv', (data) => console.log(data))
}

export {
    filterDataByFilterSettings
}