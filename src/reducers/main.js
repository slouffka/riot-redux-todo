import { List, Map } from 'immutable'
import * as types from '../constants/ActionTypes'


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

export {
  errorStatus,
  isLoading
}
