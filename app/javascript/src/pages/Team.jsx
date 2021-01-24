import React from 'react'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import GroupIcon from '@material-ui/icons/Group'

import logo from '../images/logo.png'
import '../styles/team.css'
import { Button, TextField, Select, MenuItem } from '@material-ui/core'
import { useStore } from '../store'
import { Redirect } from 'react-router-dom'

const Team = () => {
  const {
    team,
    teams,
    contests,
    getTeams,
    getContests,
    createTeamError,
    createTeam,
    joinTeamError,
    joinTeam,
    logout,
  } = useStore()
  const [selected, setSelected] = React.useState('')
  const [teamName, setTeamName] = React.useState('')
  const [companyName, setCompanyName] = React.useState('')
  const [teamId, setTeamId] = React.useState('0')
  const [contestId, setContestId] = React.useState('0')

  React.useEffect(() => {
    getContests()
  }, [])

  React.useEffect(() => {
    getTeams(contestId)
  }, [contestId])

  const handleCreate = React.useCallback((e) => {
    e.preventDefault()

    const avatar = e.target['avatar'].files[0]
    const formData = new FormData()
    formData.append('avatar', avatar)

    createTeam(contestId, teamName, companyName)
  })
  const handleJoin = React.useCallback((e) => {
    e.preventDefault()
    joinTeam(contestId, teamId)
  })

  return Object.keys(team).length === 0 && team.constructor === Object ? (
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
          <Select
            className="team-input"
            value={contestId}
            variant="outlined"
            onChange={(e) => setContestId(e.target.value)}>
            {contests.map((contest, i) => (
              <MenuItem key={i} value={contest.id}>
                {contest.name}
              </MenuItem>
            ))}
          </Select>
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
          <input
            className="file-input"
            name="avatar"
            type="file"
            accept=".png,.jpg,.jpeg,.gif"
            required
          />
          {createTeamError && <p className="inline-alert">{createTeamError}</p>}
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
          <Select
            className="team-input"
            value={contestId}
            variant="outlined"
            label="Contest"
            onChange={(e) => setContestId(e.target.value)}>
            {contests.map((contest, i) => (
              <MenuItem key={i} value={contest.id}>
                {contest.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            className="team-input"
            value={teamId}
            variant="outlined"
            onChange={(e) => setTeamId(e.target.value)}>
            {teams.map((team, i) => (
              <MenuItem key={i} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
          {joinTeamError && <p className="inline-alert">{joinTeamError}</p>}
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
      <Button onClick={logout}>Logout</Button>
    </main>
  ) : (
    <Redirect to="/" />
  )
}

export default Team
