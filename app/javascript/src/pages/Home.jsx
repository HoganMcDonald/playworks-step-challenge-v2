import React from 'react'
import { Redirect } from 'react-router-dom'

import { useStore } from '../store'

const Home = () => {
  const { team, contest } = useStore()

  // redirect if contest or team are missing
  // render router
  return (
    <main className="Home">
      {(!team || !contest) && <Redirect to={'/team'} />}
    </main>
  )
}

export default Home
