import React from 'react'

import { useStore } from '../store'
import Nav from '../components/Nav'
import TeamStepCount from '../components/TeamStepCount'
import Challenges from '../components/Challenges'
import StepTable from '../components/StepTable'
import AvatarUploader from '../components/AvatarUploader'

const TeamHome = () => {
  const { team, currentUser } = useStore()

  return (
    <main className="TeamHome">
      <Nav />
      <AvatarUploader
        image={team.avatar}
        type="team"
        editable={
          currentUser.role === 'admin' || currentUser.id == team.captainId
        }
        containerSize={{ maxHeight: '20vh', maxWidth: '120ch' }}
      />
      <h2>{team.name}</h2>
      <TeamStepCount />
      <Challenges teamOnly={true} />
      <StepTable steps={team.steps} />
    </main>
  )
}

export default TeamHome
