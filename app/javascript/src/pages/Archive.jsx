import React from 'react'
import Confetti from 'react-dom-confetti'
import Layout from '../components/Layout'

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

  React.useEffect(() => {
    setTimeout(() => {
      setConfetti(true)
    }, 100)
  }, [])

  return (
    <Layout resources={[]} skipRedirect={true}>
      <Confetti config={config} active={confetti} />
    </Layout>
  )
}

export default Archive
