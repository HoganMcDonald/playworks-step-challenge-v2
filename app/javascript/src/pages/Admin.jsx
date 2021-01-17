import React from 'react'
import { TextField, Button } from '@material-ui/core'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import Nav from '../components/Nav'
import DailyChallenge from '../components/DailyChallenge'
import { useStore } from '../store'
import '../styles/admin.css'

const Admin = () => {
  const [error, setError] = React.useState('')

  const { rules, faq, createContent } = useStore()

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

  return (
    <main className="Admin">
      <Nav />
      <h2>Update Contest Rules</h2>
      <h5>Rules</h5>
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
      <h5 style={{ marginTop: '1rem' }}>Faq</h5>
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
    </main>
  )
}

export default Admin
