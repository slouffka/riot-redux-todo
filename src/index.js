import riot, { mount } from 'riot'
import store from './store'

import './tags/todo-app.tag'
import './tags/task-list.tag'
import './tags/loading-indicator.tag'
import './tags/task-form.tag'
import './tags/error-message.tag'

document.addEventListener('DOMContentLoaded', () => {
  mount('todo-app', { store: store })
})
