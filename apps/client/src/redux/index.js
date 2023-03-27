import { combineReducers } from 'redux'
import fetcher from './fetcher/reducer'
import countries from './countries/reducer'

const rootReducer = combineReducers({
  fetcher,
  countries,
})

export default rootReducer
