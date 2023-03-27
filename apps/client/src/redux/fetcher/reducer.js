import * as types from './types'

const initialState = {
  isFetching: false,
  error: null,
}

const fetcher = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_START:
      return {
        ...state,
        error: null,
        isFetching: true,
      }
    case types.FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
      }

    case types.FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }

    case types.CLEAR_ERROR:
      return {
        ...state,
        error: false,
      }

    default:
      return state
  }
}

export default fetcher
