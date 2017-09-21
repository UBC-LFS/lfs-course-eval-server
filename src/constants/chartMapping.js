const chartMapping = {
    "dashboard": {
        "DataSource" : 'mockAggregatedData.csv',
        "Fields": ['Avg', 'classSize']
    },
    "c1": {
        "DataSource" : 'mockAggregatedData.csv',
        "Fields": ['instructor', 'courseNum', 'Avg', 'Dispersion', 'PercentFavourable', 'classSize', 'percentResponses']
    }
}

export { 
    chartMapping
 }