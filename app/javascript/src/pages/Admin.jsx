import React from 'react'
import { TextField, Button } from '@material-ui/core'
import ReactQuill from 'react-quill'
import moment from 'moment'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import 'react-quill/dist/quill.snow.css'

import Nav from '../components/Nav'
import DailyChallenge from '../components/DailyChallenge'
import { useStore } from '../store'
import '../styles/admin.css'

const Admin = () => {
  const [error, setError] = React.useState('')

  const { rules, faq, createContent, contest, deleteChallenge } = useStore()

  const [editRules, setRules] = React.useState(rules)
  const [editFaq, setFaq] = React.useState(faq)

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault()
      setError('')

      const text = e.target['description'].value
      const date = e.target['date'].value
      const image = e.target['image'].files[0]

      const formData = new FormData()

      formData.append('description', text)
      formData.append('date', date)
      formData.append('image', image)

      const response = await fetch('/challenges', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })
      if (response.status > 399) {
        const body = await response.json()
        setError(body.message || 'Unable to create challenge at this time.')
      } else {
        window.location.reload()
      }
    },
    [setError],
  )

  const handleUpdateContent = React.useCallback(
    (type, text) => {
      createContent(text, type)
    },
    [rules, faq, editRules, editFaq, createContent],
  )

  const handleDelete = React.useCallback(
    (challengeId) => {
      deleteChallenge(challengeId)
    },
    [deleteChallenge],
  )
  return (
    <main className="Admin">
      <Nav />
      <h2>Update Contest Rules</h2>
      <h3>Rules</h3>
      <ReactQuill theme="snow" value={editRules} onChange={setRules} />
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
        name="submit"
        value="Log In"
        onClick={() => handleUpdateContent('rules', editRules)}>
        Save
      </Button>
      <h3 style={{ marginTop: '1rem' }}>Faq</h3>
      <ReactQuill theme="snow" value={editFaq} onChange={setFaq} />
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
        name="submit"
        value="Log In"
        onClick={() => handleUpdateContent('faq', editFaq)}>
        Save
      </Button>
      <h2 style={{ marginTop: '1rem' }}>Create Daily Challenge</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="file-input"
            name="image"
            type="file"
            accept=".png,.jpg,.jpeg,.gif"
            required
          />
        </label>
        <TextField
          className="admin-input"
          name="description"
          label="Description"
          variant="outlined"
          type="number"
          multiline
          rows={4}
        />
        <TextField
          className="admin-input"
          name="date"
          label="Date"
          variant="outlined"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        {error && <p className="inline-alert">{error}</p>}
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
          name="submit"
          value="Log In">
          Submit
        </Button>
      </form>
      <DailyChallenge />
      <h2>Scheduled Challenges</h2>
      <table style={{ maxWidth: '80ch', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '1%' }}></th>
            <th>Date</th>
            <th>Text</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {contest.scheduledChallenges.map((challenge, index) => (
            <tr key={index}>
              <td style={{ width: '1%' }}>
                <DeleteForeverIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(challenge.id)}
                />
              </td>
              <td>{moment(challenge.date).format('MM/DD/Y')}</td>
              <td>{challenge.description}</td>
              <td>
                <img
                  src={challenge.image}
                  style={{
                    height: 'auto',
                    maxWidth: '4rem',
                    maxHeight: '4rem',
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default Admin
