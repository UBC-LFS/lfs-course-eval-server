Run using babel-node.

To show in mongo:

First start mongo

`mongod`

Then use courseval db

`use courseval`

Then run createAggregatedData.js 

`babel-node createaAggregatedData.js`

Then show

`db.aggregatedData.find()`
