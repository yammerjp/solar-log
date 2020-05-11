#!/usr/bin/env node

const fs = require('fs')
const settings = require('../settings.json')
const server = require('http').createServer()

server.on('request', (req,res) => {
  fs.readFile(settings['csv-file-path'], 'utf-8', (err,data) => {
    if(err) {
      res.writeHead(500)
      res.end()
      return
    }
    
    res.writeHead(200, {
      'Content-Type' : 'text/plain',
      'Access-Control-Allow-Origin' : '*'
    })
    res.write(data)
    res.end()
  })
})

server.listen(3000);
console.log('listen on localhost:3000');
