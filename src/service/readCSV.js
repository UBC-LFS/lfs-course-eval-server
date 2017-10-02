import fs from 'fs'
import parse from 'csv-parse'

const readCSV = (filename, callback) => {
  const parser = parse({delimiter: ',', columns: true, relax: true, auto_parse: true}, (
        err, data) => {
    if (err) throw err
    callback(data)
  })
  fs.createReadStream(__dirname + '/../data/' + filename).pipe(parser)
}

export default readCSV
