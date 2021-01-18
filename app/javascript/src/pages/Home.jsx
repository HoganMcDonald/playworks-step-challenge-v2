import React from 'react'
import { Redirect } from 'react-router-dom'

import { useStore } from '../store'
import Nav from '../components/Nav'
import Leaderboard from '../components/LeaderBoard'
import TopSteppers from '../components/TopSteppers'
import Challenges from '../components/Challenges'
import Layout from '../components/Layout'

const Home = () => {
  const { team, contest } = useStore()

  return (
    <Layout className="Home" resources={['team', 'contest']}>
      {!team || !contest ? (
        <Redirect to={'/team'} />
      ) : (
        <>
          <Leaderboard />
          <TopSteppers />
          <Challenges />
        </>
      )}
    </Layout>
  )
}

export default Home
