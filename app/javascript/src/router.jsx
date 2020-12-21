import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import { useStore } from './store'

const AuthenticatedRoute = ({ path, user, children }) => {
  const authenticated = !!user

  return authenticated ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  )
}

export default function Router({ user }) {
  const { loadUser } = useStore()

  React.useEffect(() => {
    loadUser(user)
  }, [user])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <AuthenticatedRoute path="/" user={user}>
          <p>home</p>
        </AuthenticatedRoute>
      </Switch>
    </BrowserRouter>
  )
}
