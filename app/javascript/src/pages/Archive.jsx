import React from 'react'
import Confetti from 'react-dom-confetti'
import { useParams } from 'react-router-dom'

import Layout from '../components/Layout'
import Leaderboard from '../components/LeaderBoard'
import TopSteppers from '../components/TopSteppers'
import Challenges from '../components/Challenges'
import { useStore } from '../store'

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '258px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
}

const Archive = () => {
  const [confetti, setConfetti] = React.useState(false)
  const { contestId } = useParams()
  const { leaderboard } = useStore()

  const handleLoad = React.useCallback(() => {
    setTimeout(() => setConfetti(true), 400)
  }, [])

  return (
    <Layout resources={['archive']} skipRedirect={true} onLoad={handleLoad}>
      <Confetti config={config} active={confetti} />
      {leaderboard && <Leaderboard />}
      <TopSteppers />
      <Challenges contestId={contestId} />
    </Layout>
  )
}

export default Archive
