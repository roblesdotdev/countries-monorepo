import { filteredCountries } from './filter'
import { sortedCountries } from './sort'

export function filteredAndSortedCountries(state) {
  const orderBy = state.countries.orderBy
  return sortedCountries(filteredCountries(state), orderBy)
}
