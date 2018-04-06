const pinyin = require('node-pinyin')
const shell = require('shelljs')
const ora = require('ora')

const api = require('./api')
const config = require('./config')

function convertToCity (district) {
  return {
    name: district.name,
    citycode: district.citycode,
    pinyin: pinyin(district.name, {
      style: 'normal'
    }).join('-')
  }
}

const spinner = ora(`正在向 ${config.API_DISTRICT_URL} 发送请求...`)
spinner.start()
api.district().then((data) => {
  spinner.stop()
  console.log('请求成功')

  data = JSON.parse(data)
  let country = data.districts[0]
  let provinces = country.districts

  let cities = []
  for (let province of provinces) {
    if (province.name === '北京市' || province.name === '重庆市') {
      let city = convertToCity(province)
      cities.push(city)
      continue
    }
    for (let district of province.districts) {
      if (district.level === 'city') {
        if (typeof district.citycode === 'string') {
          let city = convertToCity(district)
          cities.push(city)
        }
      }
    }
  }

  cities.sort((city1, city2) => {
    return city1.pinyin > city2.pinyin ? 1 : -1
  })

  let text = JSON.stringify(cities)
  shell.ShellString(text).to(config.DIST)

  console.log('城市文件成功生成')
}).catch((err) => {
  spinner.stop()
  console.log('请求失败')
  console.error(err)
})
