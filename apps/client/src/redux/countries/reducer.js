import * as types from './types'

const countries = (
  state = {
    items: [],
    current: null,
    orderBy: {
      alpha: null, // desc | asc | null
      population: null, // desc | asc | null
    },
    filterBy: {
      continent: 'all', // name | all
    },
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

    case types.SET_ALPHA_ORDER:
      return {
        ...state,
        orderBy: {
          ...state.orderBy,
          alpha: action.payload,
        },
      }

    case types.SET_POPULATION_ORDER:
      return {
        ...state,
        orderBy: {
          ...state.orderBy,
          population: action.payload,
        },
      }

    case types.RESET_ORDER:
      return {
        ...state,
        orderBy: {
          alpha: null,
          population: null,
        },
      }

    case types.SET_CONTINENT_FILTER:
      return {
        ...state,
        filterBy: {
          ...state.filterBy,
          continent: action.payload,
        },
      }

    case types.RESET_FILTER:
      return {
        ...state,
        filterBy: {
          continent: 'all',
        },
      }

    default:
      return state
  }
}

export default countries
