import { client } from '@/utils/client'
import * as types from './types'
import { fetchStart, fetchFailure, fetchSuccess } from '../fetcher/actions'

const receiveCountries = data => ({
  type: types.RECEIVE_COUNTRIES,
  payload: data,
})

const receiveCountryDetail = data => ({
  type: types.RECEIVE_COUNTRY_DETAIL,
  payload: data,
})

// Not use directly fetchCountries
const fetchCountries = query => dispatch => {
  dispatch(fetchStart())
  return client(`countries?name=${query ?? ''}`)
    .then(data => {
      dispatch(fetchSuccess())
      dispatch(receiveCountries(data.countries))
    })
    .catch(err => dispatch(fetchFailure(err)))
}

const fetchCountry = countryID => dispatch => {
  dispatch(fetchStart())
  return client(`countries/${countryID}`)
    .then(data => {
      dispatch(fetchSuccess())
      dispatch(receiveCountryDetail(data.country))
    })
    .catch(err => dispatch(fetchFailure(err)))
}

const shouldFetchCountries = state => {
  const countries = state.countries
  if (state.fetcher.isFetching) {
    return false
  }
  return !countries.items.length
}

const shouldFetchCountry = (countryID, state) => {
  const country = state.countries.current
  if (state.fetcher.isFetching) return false
  if (country && countryID === country.id) return false
  return typeof countryID === 'string'
}

// Use only when necessary
export const fetchCountriesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchCountries(getState())) {
    console.log('Fetching countries...')
    return dispatch(fetchCountries())
  }
}

export const fetchCountryIfNeeded = countryID => (dispatch, getState) => {
  if (shouldFetchCountry(countryID, getState())) {
    console.log(`Fetching country ${countryID}`)
    return dispatch(fetchCountry(countryID))
  }
}
