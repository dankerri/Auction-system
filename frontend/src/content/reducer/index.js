import { combineReducers } from 'redux'
import auth from './auth'
import like from './like'
import list from './list'

export default combineReducers({
  auth,
  like,
  list
})