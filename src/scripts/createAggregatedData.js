import fs from 'fs'
import parse from 'csv-parse'
import * as calculate from '../utils/calculate'

const readCSV = (filename, callback) => {
    const parser = parse({delimiter: ',', columns: true, relax: true, auto_parse: true}, (
        err, data) => {
            if (err) throw err
            callback(data)
    })
    fs.createReadStream(__dirname + '/source/' + filename).pipe(parser)
}

readCSV('mockRawData.csv', (csv) => {
    
})
