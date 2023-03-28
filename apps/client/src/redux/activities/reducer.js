import * as types from './types'

const initialState = {
  items: [],
  shouldInvalidate: true,
}

const actions = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_ACTIVITIES:
      return {
        ...state,
        shouldInvalidate: false,
        items: action.payload,
      }

    case types.RECEIVE_ACTIVITY:
      return {
        ...state,
        current: action.payload,
      }

    case types.RECEIVE_NEW_ACTIVITY:
      return {
        ...state,
        shouldInvalidate: true,
        current: action.payload,
      }

    case types.SET_QUERY_PARAM:
      return {
        ...state,
        queryParam: action.payload,
      }

    default:
      return state
  }
}

export default actions
