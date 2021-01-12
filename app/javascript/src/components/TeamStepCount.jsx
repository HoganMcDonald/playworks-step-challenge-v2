import React from 'react'

import { useStore } from '../store'

const TeamStepCount = () => {
  const { currentUser, team, leaderboard } = useStore()

  // TODO: add captain role and firure this out
  const handleClick = React.useCallback((userId) => {}, [])

  const totalSteps = React.useMemo(
    () => team.leaderboard.reduce((total, user) => total + user.sum, 0),
    [team],
  )

  const rank = React.useMemo(
    () => leaderboard.findIndex((t) => t.id == team.id) + 1 || 0,
    [leaderboard, team],
  )

  return (
    <div className="teamStepCount" style={{ marginBottom: '2rem' }}>
      <center>
        <div className="teamStepCountHeader">
          <p style={{ marginBottom: 0 }}>Steps: {totalSteps}</p>
          <p>Rank: {rank}</p>
          <h4>Team Step Count</h4>
        </div>
        <table id="leaderboardTable">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Steps</th>
              {currentUser.captain && <th>Edit</th>}
            </tr>
          </thead>
          <tbody>
            {team.leaderboard &&
              team.leaderboard.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
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
