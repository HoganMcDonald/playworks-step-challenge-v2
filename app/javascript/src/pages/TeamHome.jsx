import React from 'react'

import { useStore } from '../store'
import Nav from '../components/Nav'
import TeamStepCount from '../components/TeamStepCount'
import Challenges from '../components/Challenges'
import StepTable from '../components/StepTable'

const TeamHome = () => {
  const { team } = useStore()

  return (
    <main className="TeamHome">
      <Nav />
      <h2>{team.name}</h2>
      <TeamStepCount />
      <Challenges />
      <StepTable steps={team.steps} />
    </main>
  )
}

export default TeamHome
