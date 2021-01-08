import React from 'react'
import { Redirect } from 'react-router-dom'

import { useStore } from '../store'
import Nav from '../components/Nav'
import Leaderboard from '../components/LeaderBoard'
import TopSteppers from '../components/TopSteppers'
import Challenges from '../components/Challenges'

const Home = () => {
  const { team, contest } = useStore()

  return (
    <main className="Home">
      {(!team || !contest) && <Redirect to={'/team'} />}
      <Nav />
      <Leaderboard />
      <TopSteppers />
      <Challenges />
      {/* TODO: */}
      {/* <AllChallengePhotos /> */}
    </main>
  )
}

export default Home
