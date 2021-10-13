import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { robotReducer } from './reducers/robotReducer';
import { userReducer } from './reducers/userReducer';
import { roomReducer } from './reducers/roomReducer'
import { chatReducer } from './reducers/chatReducer'

// Connecting redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Combining reducers into one
const rootReducer = combineReducers({
  roomModule: roomReducer,
  chatModule: chatReducer,
  userModule: userReducer,

})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
