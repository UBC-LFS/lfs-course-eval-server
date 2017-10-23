#!/bin/bash

pm2 delete lfs-course-eval

source .env

npm install
npm run test-server
npm start
# npm run build

# pm2 -f start dist/lfs-course-eval.js
