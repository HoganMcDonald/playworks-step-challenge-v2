import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import TeamJoin from './pages/Team'
const TeamHome = React.lazy(() =>
  import(
    /* webpackChunkName: "team" */
    /* webpackPrefetch: true */ './pages/TeamHome'
  ),
)
const Steps = React.lazy(() =>
  import(
    /* webpackChunkName: "steps" */
    /* webpackPrefetch: true */ './pages/Steps'
  ),
)
const Post = React.lazy(() =>
  import(
    /* webpackChunkName: "post" */
    /* webpackPrefetch: true */ './pages/Post'
  ),
)
const Rules = React.lazy(() =>
  import(
    /* webpackChunkName: "rules" */
    /* webpackPrefetch: true */ './pages/Rules'
  ),
)
const Admin = React.lazy(() =>
  import(
    /* webpackChunkName: "admin" */
    /* webpackPrefetch: true */ './pages/Admin'
  ),
)
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
          <React.Suspense fallback={<div>Loading...</div>}>
            <TeamHome />
          </React.Suspense>
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/team" user={data.user}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <TeamJoin />
          </React.Suspense>
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/steps" user={data.user}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Steps />
          </React.Suspense>
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/post" user={data.user}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Post />
          </React.Suspense>
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/rules" user={data.user}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Rules />
          </React.Suspense>
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/admin" user={data.user}>
          {data.user && data.user.role === 'admin' ? (
            <React.Suspense fallback={<div>Loading...</div>}>
              <Admin />
            </React.Suspense>
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
