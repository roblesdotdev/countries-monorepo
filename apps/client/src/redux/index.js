import { combineReducers } from 'redux'
import fetcher from './fetcher/reducer'
import countries from './countries/reducer'
import activities from './activities/reducer'

const rootReducer = combineReducers({
  fetcher,
  countries,
  activities,
})

export default rootReducer
