import React from 'react'

import { useStore } from '../store'
import Nav from '../components/Nav'
import TeamStepCount from '../components/TeamStepCount'
import Challenges from '../components/Challenges'
import StepTable from '../components/StepTable'
import AvatarUploader from '../components/AvatarUploader'
import Layout from '../components/Layout'

const TeamHome = () => {
  const { team, currentUser } = useStore()

  return (
    <Layout className="TeamHome" resources={['team', 'posts', 'contest']}>
      <AvatarUploader
        image={team.avatar}
        type="team"
        editable={
          currentUser.role === 'admin' || currentUser.id == team.captain.id
        }
        containerSize={{ maxHeight: '30vh', maxWidth: '120ch' }}
      />
      <h2>{team.name}</h2>
      <TeamStepCount />
      <Challenges teamOnly={true} />
      <StepTable steps={team.steps} />
    </Layout>
  )
}

export default TeamHome
