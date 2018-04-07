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
