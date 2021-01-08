import React from 'react'
import moment from 'moment'
import { Box } from '@material-ui/core'

import '../styles/challenges.css'

const Challenges = () => {
  // TODO:
  const challenges = []
  return (
    <div>
      <div className="challengeOfTheDayHeadline">
        <h2>Challenge of the Day</h2>
      </div>
      {challenges.map((challenge, i) => (
        <div className="challengesItem" key={i}>
          <div className="challengeOfTheDay">
            {challenge.date.substring(0, 10) ===
            moment(Date()).format().substring(0, 10) ? (
              <div className="challengeOfTheDaySubtitleAndDescription">
                <h5>
                  <Box display="inline">{challenge.name}</Box>
                </h5>
                <h5>{challenge.description}</h5>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Challenges
