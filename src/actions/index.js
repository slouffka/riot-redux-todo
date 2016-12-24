import * as types from '../constants/ActionTypes'


function loadTasks() {
  return function(dispatch, getState) {
    dispatch(toggleLoading(true))

    let request = new XMLHttpRequest()
    request.open('GET', 'http://localhost:3000/tasks', true)
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let tasks = JSON.parse(request.responseText)
        dispatch(tasksLoaded(tasks))
      } else {
        dispatch(showError("Backend Error"))
      }
      dispatch(toggleLoading(false))
    }

    request.send()
  }
}

function tasksLoaded(tasks) {
  return {
    type: types.TASKS_LOADED,
    payload: {
      tasks
    }
  }
}

function toggleLoading(isLoading) {
  return {
    type: types.TOGGLE_LOADING,
    payload: isLoading
  }
}

function addTask(name) {
  return function(dispatch, getState) {
    dispatch(toggleLoading(true))

    let request = new XMLHttpRequest()
    request.open('POST', 'http://localhost:3000/tasks', true)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let task = JSON.parse(request.responseText)
        dispatch(newTaskAdded(task))
      }
      dispatch(toggleLoading(false))
    }

    request.send(JSON.stringify({
      name,
      completed: false,
      createdAt: Date.now()
    }))
  }
}

function newTaskAdded(task) {
  return {
    type: types.TASK_ADDED,
    payload: {
      id: task.id,
      name: task.name,
      completed: task.completed,
      createdAt: task.createdAt
    }
  }
}

function toggleComplete(id, completed) {
  return function(dispatch, getState) {
    let request = new XMLHttpRequest()
    request.open('PATCH', `http://localhost:3000/tasks/${id}`, true)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText)
        dispatch(completionChanged(id, completed))
      } else {
        dispatch(completionChanged(id, !completed))
        dispatch(tempErrorMessage("Backend Error"))
      }
    }

    request.send(JSON.stringify({ completed: completed }))
  }
}

function completionChanged(id, completed) {
  return {
    type: types.TASK_COMPLETION_CHANGED,
    payload: {
      id,
      completed,
      updatedAt: Date.now()
    }
  }
}

function deleteTask(id) {
  return function(dispatch, getState) {
    let request = new XMLHttpRequest()
    request.open('DELETE', `http://localhost:3000/tasks/${id}`, true)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText)
        dispatch(taskDeleted(id))
      } else {
        dispatch(tempErrorMessage("Backend Error"))
      }
    }

    request.send()
  }
}

function taskDeleted(id) {
  return {
    type: types.TASK_DELETED,
    payload: {
      id
    }
  }
}

function showError(message) {
  return {
    type: types.SHOW_ERROR,
    payload: {
      message
    }
  }
}

function hideError() {
  return { type: types.HIDE_ERROR }
}

function tempErrorMessage(message) {
  return function(dispatch, getState) {
    dispatch(showError(message))
    setTimeout(function() {
      dispatch(hideError())
    }, 1000)
  }
}

module.exports = {
  loadTasks: loadTasks,
  toggleLoading: toggleLoading,
  addTask: addTask,
  newTaskAdded: newTaskAdded,
  toggleComplete: toggleComplete,
  deleteTask: deleteTask,
  showError: showError,
  hideError: hideError
}
