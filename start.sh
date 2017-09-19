#!/bin/bash

source .env

npm install
npm run test-server
npm run build

pm2 start dist/index.js
