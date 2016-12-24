<task-form>
  <form onsubmit={ onSubmit }>
    <input type="text" ref="newTask" placeholder="Type new task">
    <button type="submit">Add task</button>
  </form>

  <style scoped>
    form input {
      padding: 5px;
      width: 80%;
    }

    form button {
      padding: 5px;
    }
  </style>

  <script>
    let newTask

    this.on('mount', function() {
      newTask = this.refs.newTask
      newTask.focus()
    })

    onSubmit(e) {
      e.preventDefault()

      if (newTask.value.length <= 2) {
        opts.onerror('Напишите текст задачи')
        return false
      }

      opts.onnewtask(newTask.value)
      newTask.value = ''
    }
  </script>
</task-form>
