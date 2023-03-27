import * as types from './types'

export const fetchStart = () => ({
  type: types.FETCH_START,
})

export const fetchSuccess = () => ({
  type: types.FETCH_SUCCESS,
})

export const fetchFailure = error => ({
  type: types.FETCH_FAILURE,
  payload: error,
})

export const clearError = () => ({
  type: types.CLEAR_ERROR,
})
