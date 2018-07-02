import React from 'react'

import {
  createStore,
  combineReducers,
} from 'redux'
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'

const store = createStore(
  combineReducers({
    form: formReducer
  })
)

export const App = ({ children }) =>
  <Provider store={store}>
    {children}
  </Provider>

