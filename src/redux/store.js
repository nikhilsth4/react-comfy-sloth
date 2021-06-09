import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer } from './root.reducer'
import thunk from 'redux-thunk'

const middlewares = [thunk]

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)
