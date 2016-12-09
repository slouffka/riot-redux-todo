<todo-app>

  <h1>{ state.title }</h1>

  <error-message message={ state.errorMessage } iserror={ state.isError } onhide={ hideErrorMessage }></error-message>
  <loading-indicator loading={ state.isLoading }></loading-indicator>
  <task-form onnewtask={ newTask }></task-form>
  <task-list tasks={ state.tasks } ontaskcompletionchange={ taskCompletionChange } ontaskremove={ taskRemove }></task-list>

  <style>
    todo-app {
      display: block;
      padding: 20px;
      border: 1px solid #555;
      box-shadow: 3px 3px 5px #555;
    }
  </style>

  <script>
    const actions = require('../actions/index')
    const store = opts.store

    this.state = store.getState()

    this.on('mount', function() {
      store.dispatch(actions.loadTasks())
    })

    store.subscribe(function() {
      this.state = store.getState()
      this.update()
    }.bind(this))

    newTask(task) {
      store.dispatch(actions.addTask(task))
    }

    taskCompletionChange(id, isComplete) {
      store.dispatch(actions.toggleComplete(id, isComplete))
    }

    taskRemove(id) {
      store.dispatch(actions.removeTask(id))
    }

    hideErrorMessage() {
      store.dispatch(actions.hideError())
    }
  </script>
</todo-app>
