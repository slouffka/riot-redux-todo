import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import riot, { mount } from 'riot'

require('./tags/todo-app.tag')
require('./tags/task-list.tag')
require('./tags/loading-indicator.tag')
require('./tags/task-form.tag')
require('./tags/error-message.tag')

const reduxStore = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

document.addEventListener('DOMContentLoaded', () => {
  mount('todo-app', { store: reduxStore })
})
