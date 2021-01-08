import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import TeamJoin from './pages/Team'
import { useStore } from './store'

const AuthenticatedRoute = ({ path, user, children }) => {
  const authenticated = !!user

  return authenticated ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/login" />
  )
}

export default function Router({ data }) {
  const [loading, setLoading] = React.useState(true)
  const { loadUser, loadTeam, loadContest } = useStore()

  React.useEffect(async () => {
    loadUser(data.user)
    loadTeam(data.team)
    loadContest(data.contest)
    // this is a total hack. sue me.
    setLoading(false)
  }, [])

  return loading ? (
    <span className="loading" />
  ) : (
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
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <AuthenticatedRoute path="/team" user={data.user}>
          <TeamJoin />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/" user={data.user}>
          <Home />
        </AuthenticatedRoute>
      </Switch>
    </BrowserRouter>
  )
}
