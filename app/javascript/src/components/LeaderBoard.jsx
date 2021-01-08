import React from 'react'

import '../styles/leaderboard.css'

const Leaderboard = () => {
  // TODO:
  const leaderboard = []

  return (
    <div className="leaderBoard">
      <center>
        <div className="leaderBoard">
          <h2>Leaderboard</h2>
        </div>
        <table id="leaderboardTable">
          <thead>
            <tr>
              <th>
                <p>Rank</p>
              </th>
              <th>
                <p>Team Name</p>
              </th>
              <th>
                <p>Steps</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((leaders, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{leaders.name}</td>
                <td>{leaders.sum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  )
}

export default Leaderboard
