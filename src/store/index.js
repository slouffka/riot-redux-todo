import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index'
import { Map } from 'immutable'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default createStore(rootReducer, Map(), composeEnhancers(
  applyMiddleware(thunk)
))
