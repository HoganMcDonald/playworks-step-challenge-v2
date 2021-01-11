import React from 'react'

import { useStore } from '../store'
import Nav from '../components/Nav'
import TeamStepCount from '../components/TeamStepCount'

const TeamHome = () => {
  const { team } = useStore()

  return (
    <main className="TeamHome">
      <Nav />
      <h2>{team.name}</h2>
      <TeamStepCount />
    </main>
  )
}

export default TeamHome
