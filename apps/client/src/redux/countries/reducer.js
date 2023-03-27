import * as types from './types'

const countries = (
  state = {
    items: [],
    current: null,
  },
  action,
) => {
  switch (action.type) {
    case types.RECEIVE_COUNTRIES:
      return {
        ...state,
        items: action.payload,
      }

    case types.RECEIVE_COUNTRY_DETAIL:
      return {
        ...state,
        current: action.payload,
      }

    default:
      return state
  }
}

export default countries
