import { filterDataByFilterSettings } from './dataService'

const handleGraphApi = (params) => {
    filterDataByFilterSettings(params)


    //package up data to send to server
}

export {
    handleGraphApi
}