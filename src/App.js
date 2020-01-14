import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'

import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from "redux"

import {BrowserRouter as Router} from 'react-router-dom'

import reducers from './reducers'

import {useRoutes} from './routes'

const store = createStore(reducers, applyMiddleware(thunk))

const routes = useRoutes()

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        {routes}
      </Router>
    </Provider>
  )
}

export default App
