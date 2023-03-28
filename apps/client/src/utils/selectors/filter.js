export function filteredCountries(state) {
  const filterBy = state.countries.filterBy
  const items = state.countries.items
  return filter(items, filterBy)
}

function filter(items, { continent, activities }) {
  const byContinent =
    continent && continent !== 'all'
      ? filterByContinent(items, continent)
      : items
  return activities.length === 0
    ? byContinent
    : filterByActivities(byContinent, activities)
}

function filterByContinent(items, continent) {
  return items.filter(item => item.continent.toLowerCase().includes(continent))
}

function filterByActivities(items, activities) {
  const activitiesIds = activities.map(a => a.id)
  return items.filter(item =>
    item.activities.find(activity => activitiesIds.includes(activity.id)),
  )
}
