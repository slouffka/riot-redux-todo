import riot, { mount } from 'riot'
import store from './store'

import './tags/todo-app.html'
import './tags/task-list.html'
import './tags/loading-indicator.html'
import './tags/task-form.html'
import './tags/error-message.html'

document.addEventListener('DOMContentLoaded', () => {
  mount('todo-app', { store: store })
})
