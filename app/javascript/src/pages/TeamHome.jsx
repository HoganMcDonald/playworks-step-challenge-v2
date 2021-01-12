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
      <img
        src={team.avatar}
        style={{ height: 'auto', maxWidth: '60ch', maxHeight: '20vh' }}
      />
      <h2>{team.name}</h2>
      <TeamStepCount />
      <Challenges teamOnly={true} />
      <StepTable steps={team.steps} />
    </main>
  )
}

export default TeamHome
