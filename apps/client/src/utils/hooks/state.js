import {
  fetchCountriesIfNeeded,
  fetchCountryIfNeeded,
  resetFilter,
  resetOrder,
  setAlphaOrder,
  setContinentFilter,
  setPopulationOrder,
} from '@/redux/countries/actions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filteredAndSortedCountries } from '../selectors'

export function useFetcher() {
  const isFetching = useSelector(state => state.fetcher.isFetching)
  const error = useSelector(state => state.fetcher.error)

  return {
    isFetching,
    error,
  }
}

export function useOrder() {
  const dispatch = useDispatch()
  const orderBy = useSelector(state => state.countries.orderBy)
  const { alpha, population } = orderBy

  const setAlpha = order => {
    dispatch(setAlphaOrder(order))
  }

  const setPopulation = order => {
    dispatch(setPopulationOrder(order))
  }

  const reset = () => {
    dispatch(resetOrder())
  }

  return {
    alpha,
    popu: population,
    setAlpha,
    setPopu: setPopulation,
    resetOrder: reset,
  }
}

export function useCountries() {
  const countries = useSelector(filteredAndSortedCountries)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCountriesIfNeeded())
  }, [dispatch])

  return {
    countries,
  }
}

export function useDetail(id) {
  const country = useSelector(state => state.countries.current)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCountryIfNeeded(id))
  }, [id])

  return { country }
}

export function useFilter() {
  const dispatch = useDispatch()
  const filterBy = useSelector(state => state.countries.filterBy)
  const { continent } = filterBy

  const setContinent = continent => {
    dispatch(setContinentFilter(continent))
  }

  const resetAllFilters = () => {
    dispatch(resetFilter())
  }

  return {
    continent,
    setContinent,
    resetFilter: resetAllFilters,
  }
}
