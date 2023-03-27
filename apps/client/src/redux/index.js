import { combineReducers } from 'redux'
import fetcher from './fetcher/reducer'

const rootReducer = combineReducers({
  fetcher,
})

export default rootReducer
