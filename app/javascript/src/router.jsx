import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import TeamJoin from './pages/Team'
import TeamHome from './pages/TeamHome'
import Steps from './pages/Steps'
import Post from './pages/Post'
import Rules from './pages/Rules'
const Admin = React.lazy(() => import('./pages/Admin'))
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
  const {
    loadUser,
    loadTeam,
    loadContest,
    loadLeaderboard,
    loadContent,
    loadPosts,
  } = useStore()

  React.useEffect(async () => {
    loadUser(data.user)
    loadTeam(data.team)
    loadContest(data.contest)
    loadLeaderboard(data.leaderboard)
    loadPosts(data.posts)
    loadContent(data.rules, data.faq)
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
        <AuthenticatedRoute path="/team/home" user={data.user}>
          <TeamHome />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/team" user={data.user}>
          <TeamJoin />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/steps" user={data.user}>
          <Steps />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/post" user={data.user}>
          <Post />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/rules" user={data.user}>
          <Rules />
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/admin" user={data.user}>
          {data.user && data.user.role === 'admin' ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Admin />
            </Suspense>
          ) : (
            <Redirect to="/" />
          )}
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/" user={data.user}>
          <Home />
        </AuthenticatedRoute>
      </Switch>
    </BrowserRouter>
  )
}
