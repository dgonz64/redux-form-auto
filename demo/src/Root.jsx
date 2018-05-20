import React from 'react'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { App } from './components/App.jsx'
import { editing } from './ducks'
import { setLanguageByName } from 'redux-form-auto'

setLanguageByName('en')

const reducer = combineReducers({
  form: formReducer,
  [editing.NAME]: editing.reducer
})

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
