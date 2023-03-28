export function filteredCountries(state) {
  const filterBy = state.countries.filterBy
  const items = state.countries.items
  return filter(items, filterBy)
}

function filter(items, { continent }) {
  return continent && continent !== 'all'
    ? filterByContinent(items, continent)
    : items
}

function filterByContinent(items, continent) {
  return items.filter(item => item.continent.toLowerCase().includes(continent))
}
