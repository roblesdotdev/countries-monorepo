const { fakeActivities, seasonList } = require('./fake')

function mapCountries(data) {
  return data.map(country => ({
    id: country.cca3,
    name: country.name.common,
    continent: country.continents[0],
    capital: country.capital ? country.capital[0] : '',
    subregion: country.subregion,
    area: country.area,
    population: country.population,
    flag_img: country.flags[1],
  }))
}

function fetchData() {
  return fetch('https://restcountries.com/v3/all').then(async res => {
    if (res.ok) {
      const data = await res.json()
      if (!Array.isArray(data)) return Promise.reject('Invalid response')
      return Promise.resolve(mapCountries(data))
    }
    return Promise.reject(new Error('Something went wrong with the api call'))
  })
}

function getRandomItems(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len)
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available')
  while (n--) {
    var x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

function getRandomNum(min, max) {
  min = Math.ceil(min)
  max = Math.ceil(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getAllActivities(arrIds) {
  return fakeActivities.map(t => ({
    name: t,
    duration: `${getRandomNum(1, 24)}`,
    difficulty: `${getRandomNum(1, 5)}`,
    season: `${getRandomItems(seasonList, 1)}`,
    countries: getRandomItems(arrIds, getRandomNum(1, 5)),
  }))
}

module.exports = {
  getAllActivities,
  fetchData,
}
