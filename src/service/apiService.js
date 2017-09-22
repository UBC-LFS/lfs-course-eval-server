import { filterDataByFilterSettings, filterData } from './dataService'
import * as chart from '../constants/chartMapping'

// maybe handle graph key handling here
const handleGraphAPI = (chartKey, params) => {

    const chartMapping = chart.chartMapping[chartKey]
    return filterDataByFilterSettings(params, chartMapping)


    //package up data to send to server
}

const handleFilterData = () => {
    return filterData()
}

export {
    handleGraphAPI,
    handleFilterData
}