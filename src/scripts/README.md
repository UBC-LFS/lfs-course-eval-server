The scripts in this directory require babel-cli. You can install it using

`npm install -g babel-cli`

And run scripts in this directory using

`babel-node <script name>` for Mac

`babel-node .\<script name>` for Windows

To show in mongo:

First start mongo

`sudo mongod` for Mac

`"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"` for Windows

Then use courseval db

`use courseval`

Populate the database with these commands:

`babel-node runCreate.js`

`babel-node writeToMongo.js`

Then show

`db.aggregatedData.find()`
