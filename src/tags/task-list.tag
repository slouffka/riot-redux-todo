<task-list>
  <ul>
    <li each={ task in opts.tasks }>
      <input type="checkbox" checked={ task.isComplete } onchange={ onChange } />
      <span class={ task.isComplete ? 'checked' : ''}>{ task.name }</span>
      <button class="remove" type="button" onclick={ onRemove }>x</button>
    </li>
  </ul>

  <style>
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

    button.remove {
      visibility: hidden;
    }

    li:hover > button.remove {
      visibility: visible;
    }
  </style>

  <script>
    onChange(e) {
      opts.ontaskcompletionchange(e.item.task.id, e.target.checked)
    }

    onRemove(e) {
      opts.ontaskremove(e.item.task.id)
    }
  </script>
</task-list>
