import {
  fetchCountriesIfNeeded,
  fetchCountryIfNeeded,
} from '@/redux/countries/actions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function useFetcher() {
  const isFetching = useSelector(state => state.fetcher.isFetching)
  const error = useSelector(state => state.fetcher.error)

  return {
    isFetching,
    error,
  }
}

export function useCountries() {
  const countries = useSelector(state => state.countries.items)
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
