import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/Login'

const AuthenticatedRoute = ({ path, user, children }) => {
  const authenticated = !!user

  return authenticated ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  )
}

export default function Router() {
  const user = false

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <p>signup</p>
        </Route>
        <Route path="/forgot-password">
          <p>forgot password</p>
        </Route>
        <AuthenticatedRoute path="/" user={user}>
          <p>home</p>
        </AuthenticatedRoute>
      </Switch>
    </BrowserRouter>
  )
}
