// Action creator is used to evade typos in action type names. If we call
// incorrect action creator function from tag script - we will get an error.

function changeTitle(newTitle) {
  return { type: 'CHANGE_TITLE', data: newTitle }
}

function resetTitle() {
  return { type: 'RESET_TITLE' }
}

function tasksLoaded(tasks) {
  return { type: 'TASKS_LOADED', data: tasks }
}

// This async task returns a function which is used with Redux Thunk middleware.
//
// TODO: Read carefully about Thunk and understand it.
function loadTasks() {
  return function(dispatch, getState) {
    dispatch(toggleLoading(true))

    let request = new XMLHttpRequest()
    request.open('GET', 'http://localhost:3000/tasks', true)
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText)
        dispatch(tasksLoaded(data))
      } else {
        dispatch(showError("Backend Error"))
      }
      dispatch(toggleLoading(false))
    }

    request.send()
  }
}

function toggleLoading(isLoading) {
  return { type: 'TOGGLE_LOADING', data: isLoading }
}

function addTask(taskName) {
  return function(dispatch, getState) {
    dispatch(toggleLoading(true))
    let request = new XMLHttpRequest()
    request.open('POST', 'http://localhost:3000/tasks', true)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText)
        dispatch(newTaskAdded(data.id, data.name, data.createdAt))
      }
      dispatch(toggleLoading(false))
    }

    request.send(JSON.stringify({ name: taskName, createdAt: Date.now() }))
  }
}

function newTaskAdded(id, name, createdAt) {
  return { type: 'TASK_ADDED', data: { id: id, name: name, createdAt: createdAt } }
}

function toggleComplete(id, isComplete) {
  return function(dispatch, getState) {
    let request = new XMLHttpRequest()
    request.open('PATCH', `http://localhost:3000/tasks/${id}`, true)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText)
        dispatch(completeChanged(id, isComplete))
      } else {
        dispatch(completeChanged(id, !isComplete))
        dispatch(tempErrorMessage("Backend Error"))
      }
    }

    request.send(JSON.stringify({ isComplete: isComplete }))
  }
}

function completeChanged(id, isComplete) {
  return {
    type: 'TASK_COMPLETION_CHANGED',
    data: {
      id: id,
      isComplete: isComplete,
      updatedAt: Date.now()
    }
  }
}

function removeTask(id) {
  return function(dispatch, getState) {
    let request = new XMLHttpRequest()
    request.open('DELETE', `http://localhost:3000/tasks/${id}`, true)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        let data = JSON.parse(request.responseText)
        dispatch(taskRemoved(id))
      } else {
        dispatch(tempErrorMessage("Backend Error"))
      }
    }

    request.send()
  }
}

function taskRemoved(id) {
  return {
    type: 'TASK_REMOVED',
    data: {
      id: id
    }
  }
}

function showError(message) {
  return {
    type: 'SHOW_ERROR',
    data: message
  }
}

function hideError() {
  return { type: 'HIDE_ERROR' }
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
  changeTitle: changeTitle,
  resetTitle: resetTitle,
  loadTasks: loadTasks,
  toggleLoading: toggleLoading,
  addTask: addTask,
  newTaskAdded: newTaskAdded,
  toggleComplete: toggleComplete,
  removeTask: removeTask,
  showError: showError,
  hideError: hideError
}
