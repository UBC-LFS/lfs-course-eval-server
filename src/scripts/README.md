Run using babel-node.

To show in mongo:

First start mongo

`mongod`

Then use courseval db

`use courseval`

Then run runCreate.js 

`babel-node runCreate.js`

Then run writeToMongo.js

`babel-node writeToMongo.js`

Then show

`db.aggregatedData.find()`
