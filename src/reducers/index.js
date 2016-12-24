import { combineReducers } from 'redux-immutable'

import { errorStatus, isLoading } from './main'
import { activeFilter, taskList } from './tasks'


export default combineReducers({
  errorStatus,
  isLoading,
  activeFilter,
  taskList
})
