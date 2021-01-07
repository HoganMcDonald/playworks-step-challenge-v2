import React from 'react'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import GroupIcon from '@material-ui/icons/Group'

import logo from '../images/logo.png'
import '../styles/team.css'
import { Button, TextField } from '@material-ui/core'

const Team = () => {
  const [selected, setSelected] = React.useState('')
  const [teamName, setTeamName] = React.useState('')
  const [companyName, setCompanyName] = React.useState('')
  const [contestCode, setContestCode] = React.useState('')
  const [teamCode, setTeamCode] = React.useState('')

  const handleCreate = React.useCallback((e) => {
    e.preventDefault()
  })
  const handleJoin = React.useCallback((e) => {
    e.preventDefault()
  })

  let createError = null
  let joinError = null

  return (
    <main className="Team">
      <img className="logo" src={logo} alt="" />
      {!selected && (
        <>
          <Button onClick={() => setSelected('create')}>
            <span>
              <GroupAddIcon
                style={{ width: 110, height: 110, display: 'block' }}
                fontSize="large"
              />
              <h5>Create Team</h5>
            </span>
          </Button>
          <Button onClick={() => setSelected('join')}>
            <span>
              <GroupIcon
                style={{ width: 110, height: 110, display: 'block' }}
                fontSize="large"
              />
              <h5>Join Team</h5>
            </span>
          </Button>
        </>
      )}
      {selected === 'create' && (
        <form onSubmit={handleCreate}>
          <h4>Create a Team</h4>
          <TextField
            className="team-input"
            name="contestCode"
            value={contestCode}
            label="Contest Code"
            variant="outlined"
            type="text"
            required
            onChange={(e) => setContestCode(e.target.value)}
          />
          <TextField
            className="team-input"
            name="teamName"
            value={teamName}
            label="Team Name"
            variant="outlined"
            type="text"
            required
            onChange={(e) => setTeamName(e.target.value)}
          />
          <TextField
            className="team-input"
            name="companyName"
            value={companyName}
            label="Company Name"
            variant="outlined"
            type="text"
            required
            onChange={(e) => setCompanyName(e.target.value)}
          />
          {createError && <p className="inline-alert">{createError}</p>}
          <Button
            variant="contained"
            style={{
              color: 'white',
              marginTop: '1rem',
              fontSize: 18,
              background: '#054f95',
            }}
            color="primary"
            className="btn"
            type="submit"
            name="submit">
            Create
          </Button>
        </form>
      )}
      {selected === 'join' && (
        <form onSubmit={handleJoin}>
          <h4>Join a Team</h4>
          <TextField
            className="team-input"
            name="teamCode"
            value={teamCode}
            label="Team Code"
            variant="outlined"
            type="text"
            required
            onChange={(e) => setTeamCode(e.target.value)}
          />
          {joinError && <p className="inline-alert">{joinError}</p>}
          <Button
            variant="contained"
            style={{
              color: 'white',
              marginTop: '1rem',
              fontSize: 18,
              background: '#054f95',
            }}
            color="primary"
            className="btn"
            type="submit"
            name="submit">
            Join
          </Button>
        </form>
      )}
    </main>
  )
}

export default Team
