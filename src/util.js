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

const URL = 'http://api.map.baidu.com/geocoder/v2/'

export function getCity (success, fail) {
  return getPosition().then((position) => {
    return Vue.http.jsonp(URL, {
      params: {
        ak: 'hPN9B5HjWvL1uXZnorHe94PKQ9vvFT1G',
        location: position.latitude + ',' + position.longitude,
        output: 'json',
        pois: 0
      }
    })
  }).then((response) => {
    if (status !== 0 || response.ok || response.data.result.addressComponent.city) {
      return response.data.result.addressComponent.city
    }
    throw new Error('request baidu api failure.')
  })
}
