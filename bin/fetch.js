`use strict`

const request = require('request')
const fs = require('fs')
const settings = require('../settings.json')

const fetchRaw = ipAddress =>  new Promise( (resolve,reject) => {
  request(
    {
      uri: `http://${ipAddress}/getEpData.cgi`,
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: 'ep_units=KW'
    },
    (error, response, body) => {
      if (error) {
        reject(error)
      }
      resolve(body)
    }
  )
})
const { 'frontier-server-ip-address': ipAddress, 'csv-file-path': filePath } = settings

const logging = () => {
return fetchRaw(ipAddress).then( body => {
  const row = new Date().toISOString()  + ',' + body.replace( /\|/g, ',')  + '\n'
  // 現在時刻, 発電力, 買電力, 売電力, _, _, _, _, 気象情報計測日時, 日射量, 気温, 積算電力計測日時, 電力

  return fs.appendFile(filePath,row,'utf-8',err => {})
})
}

module.exports = logging

