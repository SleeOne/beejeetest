import React from 'react'
import {Switch, Route} from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from "./pages/LoginPage"

export const useRoutes = () => {

  return (
    <Switch>
      <Route path='/' exact>
        <HomePage/>
      </Route>
      <Route path='/login'>
        <LoginPage/>
      </Route>

    </Switch>
  )
}
