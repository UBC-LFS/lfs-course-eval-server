import jsonfile from 'jsonfile'
import { aggregatedData } from '../utils/constants'
import { expandCount } from '../utils/calculate'
import assert from 'assert'
import R from 'ramda'

jsonfile.readFile('./output/' + aggregatedData + '.json', (err, json) => {
  assert.equal(null, err)
  const dataFrom2011 = json.filter(section => section.year === 2011)
  const UMI6Counts = R.flatten(dataFrom2011.map(section => expandCount(section.UMI6.count)))
  console.log(R.mean(UMI6Counts), UMI6Counts.length)
  console.log(dataFrom2011.length)
})
