import React from 'react'
import { TextField, Button } from '@material-ui/core'

import Nav from '../components/Nav'
import DailyChallenge from '../components/DailyChallenge'
import '../styles/admin.css'

const Admin = () => {
  const [error, setError] = React.useState('')

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault()
      setError('')

      const text = e.target['description'].value
      const image = e.target['image'].files[0]

      const formData = new FormData()

      formData.append('description', text)
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

  return (
    <main className="Admin">
      <Nav />
      <h2>Create Daily Challenge</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input className="file-input" name="image" type="file" required />
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
    </main>
  )
}

export default Admin
