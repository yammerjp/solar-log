#!/usr/bin/env node

`use strict`

const cron = require('node-cron')
const logging = require('./fetch.js')

cron.schedule('0 * * * * *', async () => {
  await logging()
})

