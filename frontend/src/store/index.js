import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { robotReducer } from './reducers/robotReducer';
import { userReducer } from './reducers/userReducer';
import { tattooReducer } from './reducers/tattooReducer'

// Connecting redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Combining reducers into one
const rootReducer = combineReducers({
  tattooModule: tattooReducer,
  userModule: userReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
