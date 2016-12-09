let defaultState = {
  title: 'Todo App with Riot.js & Redux',
  tasks: []
}

let actionMap = {

  CHANGE_TITLE: (state, action) => {
    return Object.assign({}, state, { title: action.data })
  },

  RESET_TITLE: (state, action) => {
    return Object.assign({}, defaultState)
  },

  TASKS_LOADED: (state, action) => {
    return Object.assign({}, state, { tasks: action.data })
  },

  TOGGLE_LOADING: (state, action) => {
    return Object.assign({}, state, { isLoading: action.data })
  },

  TASK_ADDED: (state, action) => {
    return Object.assign({}, state, { tasks: state.tasks.concat(action.data) })
  },

  TASK_COMPLETION_CHANGED: (state, action) => {
    let taskIndex = state.tasks.findIndex(function(task) {
      return task.id === action.data.id
    })

    let newTasks = [
      ...state.tasks.slice(0, taskIndex),
      Object.assign({}, state.tasks[taskIndex], { isComplete: action.data.isComplete }),
      ...state.tasks.slice(taskIndex + 1)
    ]

    return Object.assign({}, state, { tasks: newTasks })
  },

  TASK_REMOVED: (state, action) => {
    let taskIndex = state.tasks.findIndex(function(task) {
      return task.id === action.data.id
    })

    let newTasks = [
      ...state.tasks.slice(0, taskIndex),
      ...state.tasks.slice(taskIndex + 1)
    ]

    return Object.assign({}, state, { tasks: newTasks })
  },

  SHOW_ERROR: (state, action) => {
    return Object.assign({}, state, { isError: true, errorMessage: action.data })
  },

  HIDE_ERROR: (state, action) => {
    return Object.assign({}, state, { isError: false, errorMessage: '' })
  }

}

let rootReducer = (state = defaultState, action) => {
  // using action map instead of switch
  if (typeof actionMap[action.type] === 'function') {
    return actionMap[action.type](state, action)
  } else {
    return state
  }
}

export default rootReducer
