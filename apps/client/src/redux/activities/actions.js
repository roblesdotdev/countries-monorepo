import { client } from '@/utils/client'
import { fetchStart, fetchSuccess, fetchFailure } from '../fetcher/actions'
import * as types from './types'

const receiveActivities = data => ({
  type: types.RECEIVE_ACTIVITIES,
  payload: data,
})

const fetchActivities = () => dispatch => {
  dispatch(fetchStart())
  client('activities')
    .then(data => {
      dispatch(fetchSuccess())
      dispatch(receiveActivities(data.activities))
    })
    .catch(e => dispatch(fetchFailure(e)))
}

const shouldRequestActivities = state => {
  return state.activities.shouldInvalidate
}

export const fetchActivitiesIfNeeded = () => (dispatch, getState) => {
  if (shouldRequestActivities(getState())) {
    console.log('fetching activities...')
    dispatch(fetchActivities())
  }
}
