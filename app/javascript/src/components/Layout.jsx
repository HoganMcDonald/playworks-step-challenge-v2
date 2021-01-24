import React from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import Nav from './Nav'
import { useStore } from '../store'

const Layout = ({ children, className, resources, skipRedirect, onLoad }) => {
  const history = useHistory()
  const location = useLocation()
  const { contestId } = useParams()
  const [localLoading, setLocalLoading] = React.useState(true)
  const [noRedirect, setNoRedirect] = React.useState(false)

  const {
    getTeam,
    teamLoading,
    getContest,
    contestLoading,
    getPosts,
    posttsLoading,
    currentUser,
  } = useStore()

  // Redirect
  React.useEffect(() => {
    if (skipRedirect) {
      setNoRedirect(true)
    } else if (!currentUser.currentContestId || !currentUser.currentTeamId) {
      if (location.pathname !== 'test') history.push('/team')
    } else {
      setNoRedirect(true)
    }
  }, [])

  // Team
  React.useEffect(async () => {
    if (noRedirect && resources.includes('team')) {
      await getTeam(currentUser.currentTeamId)
    }
    setLocalLoading(false)
  }, [noRedirect])

  // Contest
  React.useEffect(async () => {
    if (noRedirect && resources.includes('contest')) {
      await getContest(currentUser.currentContestId)
    }
    setLocalLoading(false)
  }, [noRedirect])

  // Contest
  React.useEffect(async () => {
    if (noRedirect && resources.includes('posts')) {
      await getPosts(currentUser.currentContestId, 1)
    }
    setLocalLoading(false)
  }, [noRedirect])

  // Archive
  React.useEffect(async () => {
    if (noRedirect && resources.includes('archive')) {
      await getContest(contestId)
      await getPosts(contestId, 1)
    }
    setLocalLoading(false)
  }, [noRedirect])

  const loading = React.useMemo(() => {
    const loaded =
      localLoading || teamLoading || contestLoading || posttsLoading

    if (loaded && onLoad) onLoad()

    return loaded
  }, [localLoading, teamLoading, contestLoading, posttsLoading])

  return (
    <main className={className}>
      <Nav />
      {!loading && children}
    </main>
  )
}

export default Layout
