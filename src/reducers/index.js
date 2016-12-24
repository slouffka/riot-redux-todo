import { List, Map } from 'immutable'
import { combineReducers } from 'redux-immutable'
import * as types from '../constants/ActionTypes'


function activeFilter(state = 'all', action) {
  switch (action.type) {
    case types.CHANGE_FILTER:
      console.info(`%cFilter changed: ${action.payload.toUpperCase()}`, 'color:red; font-weight:bold;')
      return action.payload
    default:
      return state
  }
}

function taskList(state = List(), action) {

  console.log('taskList action', action)

  switch (action.type) {
    case types.TASKS_LOADED:
      return state.merge(action.payload.tasks)

    case types.TASK_ADDED:
      return state.push(Map({
        id: action.payload.id,
        name: action.payload.name,
        completed: false,
        createdAt: action.payload.createdAt
      }))

    case types.TASK_COMPLETION_CHANGED:
      return state.map(task => {
        if (task.get('id') === action.payload.id) {
          return task.update('completed', v => action.payload.completed)
        }
        return task
      })

    case types.TASK_DELETED:
      return state.filter(task => task.get('id') !== action.payload.id)

    case types.TASKS_DELETE_ALL:
      return state.clear()

    default:
      return state
  }
}

function errorStatus(state = Map({ isError: false, message: '' }), action) {
  switch (action.type) {
    case types.SHOW_ERROR:
      return state.merge({ isError: true, message: action.payload.message })

    case types.HIDE_ERROR:
      return state.merge({ isError: false, message: '' })

    default:
      return state
  }
}

function isLoading(state = false, action) {
  switch (action.type) {
    case types.TOGGLE_LOADING:
      return state = action.payload

    default:
      return state
  }
}

export default combineReducers({
  isLoading,
  errorStatus,
  activeFilter,
  taskList
})
