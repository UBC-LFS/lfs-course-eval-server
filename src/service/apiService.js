import { filterDataByFilterSettings } from './dataService'

// maybe handle graph key handling here
const handleGraphAPI = (chartKey, params) => {


    filterDataByFilterSettings(params)


    //package up data to send to server
}

export {
    handleGraphAPI
}