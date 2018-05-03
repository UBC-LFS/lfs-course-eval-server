Run using babel-node. 
You can install babel-node using

`npm install -g babel-cli`

And run scripts in this folder using

`babel-node <script name>` for Mac

`babel-node .\<script name>` for Windows

To show in mongo:

First start mongo

`sudo mongod` for Mac

`"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"` for Windows

Then use courseval db

`use courseval`

Then run runCreate.js 

`babel-node runCreate.js`

Then run writeToMongo.js

`babel-node writeToMongo.js`

Then show

`db.aggregatedData.find()`
