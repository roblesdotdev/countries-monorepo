export function sortedCountries(state) {
  const orderBy = state.countries.orderBy
  const items = state.countries.items
  return sort(items, orderBy)
}

function sort(items, orderBy) {
  const alphaOrdered = orderBy.alpha ? alphaOrder(items, orderBy.alpha) : items
  return orderBy.population
    ? populationOrder(alphaOrdered, orderBy.population)
    : alphaOrdered
}

function alphaOrder(items, orderBy) {
  return orderBy === 'asc'
    ? items.slice().sort((a, b) => a.name.localeCompare(b.name))
    : items.slice().sort((a, b) => b.name.localeCompare(a.name))
}

function populationOrder(items, orderBy) {
  return orderBy === 'asc'
    ? items.slice().sort((a, b) => b.population - a.population)
    : items.slice().sort((a, b) => a.population - b.population)
}
