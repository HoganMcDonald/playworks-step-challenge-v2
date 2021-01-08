import React from 'react'
import { Redirect } from 'react-router-dom'

import { useStore } from '../store'
import Nav from '../components/Nav'

const Home = () => {
  const { team, contest } = useStore()

  return (
    <main className="Home">
      {(!team || !contest) && <Redirect to={'/team'} />}
      <Nav />
    </main>
  )
}

export default Home
