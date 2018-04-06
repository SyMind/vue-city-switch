const http = require('http')
const qs = require('querystring')

const config = require('./config')

exports.district = () => {
  let param = qs.stringify({
    key: config.API_KEY,
    keywords: '中华人民共和国',
    subdistrict: 2,
    extension: 'base',
    output: 'JSON'
  })

  return new Promise((resolve, reject) => {
    let req = http.get(config.API_DISTRICT_URL + '?' + param, (res) => {
      res.setEncoding('utf8')
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        resolve(data)
      })
    })

    req.on('error', (err) => {
      reject(err)
    })
  })
}
