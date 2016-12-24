<todo-app>
  <div class="container">
    <h1>Riot.js, Redux and Immutable TODO</h1>

    <error-message state={ state.errorStatus } onhide={ hideErrorMessage }></error-message>
    <task-form onnewtask={ newTask }></task-form>
    <task-list tasks={ state.taskList } ontaskcompletionchange={ taskCompletionChange } ontaskdelete={ taskDelete }></task-list>
    <loading-indicator isloading={ state.isLoading }></loading-indicator>
  </div>

  <style>
    todo-app {
      width: 100%;
      text-align: center;
    }

    .container {
      display: block;
      padding: 20px;
      border: 1px solid #555;
      box-shadow: 3px 3px 5px #555;
      width: 800px;
      margin: auto;
      text-align: left;
    }
  </style>

  <script>
    const actions = require('../actions/index')
    const store = opts.store

    // we use Immutable.JS to store and work with state
    // to use it within component templates we need to convert to POJO
    this.state = store.getState().toJS()

    this.on('mount', function() {
      store.dispatch(actions.loadTasks())
    })

    store.subscribe(function() { 
      this.state = store.getState().toJS()
      this.update()
    }.bind(this))

    newTask(task) {
      store.dispatch(actions.addTask(task))
    }

    taskCompletionChange(id, completed) {
      store.dispatch(actions.toggleComplete(id, completed))
    }

    taskDelete(id) {
      store.dispatch(actions.deleteTask(id))
    }

    hideErrorMessage() {
      store.dispatch(actions.hideError())
    }
  </script>
</todo-app>
