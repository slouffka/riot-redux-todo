import { List, Map } from 'immutable'
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
  switch (action.type) {
    case types.TASKS_LOADED:
      return state.merge(action.payload)

    case types.TASK_ADDED:
      return state.push(Map(action.payload))

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

export {
  activeFilter,
  taskList
}
