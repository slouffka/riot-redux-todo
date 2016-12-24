<task-list>
  <ul>
    <li each={ task in opts.tasks }>
      <input type="checkbox" checked={ task.completed } onchange={ onChange } />
      <span class={ task.completed ? 'checked' : ''}>{ task.name }</span>
      <button class="delete" type="button" onclick={ onDelete }>x</button>
    </li>
  </ul>

  <style scoped>
    ul {
      padding-left: 0;
      margin-bottom: 0;
    }

    li {
      list-style-type: none;
      padding: 10px 5px 10px 0;
    }

    li input[type=checkbox] {
      margin-left: 0;
    }

    li span.checked {
      text-decoration: line-through;
    }

    button.delete {
      visibility: hidden;
    }

    li:hover > button.delete {
      visibility: visible;
    }
  </style>

  <script>
    onChange(e) {
      opts.ontaskcompletionchange(e.item.task.id, e.target.checked)
    }

    onDelete(e) {
      opts.ontaskdelete(e.item.task.id)
    }
  </script>
</task-list>
