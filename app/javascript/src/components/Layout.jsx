import React from 'react'
import Nav from './Nav'
import { useStore } from '../store'

const Layout = ({ children, className, resources }) => {
  const [localLoading, setLocalLoading] = React.useState(true)

  const {
    getTeam,
    teamLoading,
    getContest,
    contestLoading,
    currentUser,
  } = useStore()

  // Team
  React.useEffect(async () => {
    if (resources.includes('team')) {
      await getTeam(currentUser.currentTeamId)
    }
    setLocalLoading(false)
  }, [])

  // Contest
  React.useEffect(async () => {
    if (resources.includes('contest')) {
      await getContest(currentUser.currentContestId)
    }
    setLocalLoading(false)
  }, [])

  const loading = React.useMemo(
    () => localLoading || teamLoading || contestLoading,
    [localLoading, teamLoading, contestLoading],
  )

  return (
    <main className={className}>
      <Nav />
      {!loading && children}
    </main>
  )
}

export default Layout
