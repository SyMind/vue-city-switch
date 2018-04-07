export function findCitiesByInitial (cityGroup, initial) {
  initial = initial.toUpperCase()
  let start = 0
  let end = cityGroup.length - 1
  let mid = parseInt(end / 2)
  while (start <= end) {
    if (cityGroup[mid].initial > initial) end = mid - 1
    if (cityGroup[mid].initial < initial) start = mid + 1
    if (cityGroup[mid].initial === initial) break
    mid = parseInt((end + start) / 2)
  }
  return cityGroup[mid]
}

export function findCitiesByName (cityGroup, name) {
  let result = []
  for (let group of cityGroup) {
    for (let city of group.cities) {
      if (city.name.indexOf(name) === 0) {
        result.push(city)
      }
    }
    if (result.length !== 0) break
  }
  return result
}

function isValdCity (city) {
  if (!(city.name && typeof city.name === 'string' && city.citycode && typeof city.citycode === 'string')) {
    return false
  }
  return true
}

function isValidCommonCities (commonCities) {
  if (commonCities && Array.isArray(commonCities)) {
    let isValid = true
    for (let city of commonCities) {
      if (!isValdCity(city)) {
        isValid = false
      }
    }
    if (isValid) return true
  }
  return false
}

function hasCity (commonCities, city) {
  for (let item of commonCities) {
    if (item.name === city.name && item.citycode === city.citycode) {
      return item
    }
  }
  return null
}

export function getCommonCities () {
  if (localStorage) {
    let data = localStorage.getItem('common_cities')
    if (data) {
      let commonCities = JSON.parse(data)
      if (isValidCommonCities(commonCities)) {
        return commonCities
      }
    }
  }

  return []
}

export function addCommonCities (city) {
  if (isValdCity(city) && localStorage) {
    let commonCities = getCommonCities()
    if (!hasCity(commonCities, city)) {
      commonCities.push(city)
      localStorage.setItem('common_cities', JSON.stringify(commonCities))
    }
    return true
  }

  return false
}
