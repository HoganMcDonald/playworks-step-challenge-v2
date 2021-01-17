import React from 'react'
import moment from 'moment'

import { useStore } from '../store'

const DailyChallenge = () => {
  const { contest } = useStore()
  const { dailyChallenge } = contest

  return !!dailyChallenge ? (
    <div
      className="DailyChallenge"
      style={{ maxWidth: '60ch', textAlign: 'center', margin: 'auto' }}>
      <h2 style={{ marginBottom: 0 }}>Today's Challenge </h2>
      <h5>{moment(dailyChallenge.created_at).format('MMM DD, Y')}</h5>
      <p>{dailyChallenge.description}</p>
      <img
        src={dailyChallenge.image}
        style={{ height: 'auto', maxWidth: '100%', maxHeight: '12rem' }}
      />
    </div>
  ) : null
}

export default DailyChallenge
