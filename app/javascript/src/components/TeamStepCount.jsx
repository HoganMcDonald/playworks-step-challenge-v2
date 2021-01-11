import React from 'react'

import { useStore } from '../store'

const TeamStepCount = () => {
  const { currentUser, team } = useStore()

  // TODO: add captain role and firure this out
  const handleClick = React.useCallback((userId) => {}, [])

  return (
    <div className="teamStepCount">
      <center>
        <div className="teamStepCountHeader">
          <h4>Team Step Count</h4>
        </div>
        <table id="leaderboardTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Steps</th>
              {currentUser.captain && <th>Edit</th>}
            </tr>
          </thead>
          <tbody>
            {team.leaderboard &&
              team.leaderboard.map((user, i) => (
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.sum}</td>
                  {currentUser.captain && (
                    <th>
                      <button onClick={() => handleClick(user.id)}>
                        Edit Logs
                      </button>
                    </th>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </center>
    </div>
  )
}

export default TeamStepCount
