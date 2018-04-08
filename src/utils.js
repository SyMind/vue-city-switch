import Vue from 'vue'

export function getPosition () {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      }, (err) => {
        reject(err && (err.message || 'h5 get position error'))
      }, {
        enableHighAccuracy: true
      })
    } else {
      throw new Error('not support api about getting position.')
    }
  })
}

const URL = 'http://restapi.amap.com/v3/geocode/regeo'

export function getCity (success, fail) {
  return getPosition().then((position) => {
    return Vue.http.jsonp(URL, {
      params: {
        key: '08bca501f912990256215b150faa09df',
        location: position.longitude + ',' + position.latitude,
        extensions: 'base',
        output: 'json',
        batch: false,
        roadlevel: 0
      }
    })
  }).then((response) => {
    if (status !== 0 && response.data.status === '1') {
      let addressComponent = response.data.regeocode.addressComponent
      if (Array.isArray(addressComponent.city)) {
        return {
          name: addressComponent.province,
          citycode: addressComponent.citycode
        }
      } else {
        return {
          name: addressComponent.city,
          citycode: addressComponent.citycode
        }
      }
    }
    throw new Error('request baidu api failure.')
  })
}

export function isChinese (word) {
  let regex = /^[\u4e00-\u9fa5]+$/
  return regex.test(word)
}
