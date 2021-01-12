import React from 'react'
import { TextField, Button } from '@material-ui/core'

import Nav from '../components/Nav'
import '../styles/post.css'
import { useStore } from '../store'

const Post = () => {
  const { team } = useStore()

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault()

      const text = e.target['text'].value
      const image = e.target['image'].files[0]
      const team_id = team.id

      const formData = new FormData()

      formData.append('text', text)
      formData.append('image', image)
      formData.append('team_id', team_id)

      fetch('/posts', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      }).then(() => {
        window.location.href = '/team/home'
      })
    },
    [team],
  )

  return (
    <main className="Post">
      <Nav />
      <h2>Upload Photo to Team Feed</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Image
          <input className="file-input" name="image" type="file" required />
        </label>
        <TextField
          className="post-input"
          name="text"
          label="Text"
          variant="outlined"
          type="number"
          multiline
          rows={4}
          required
        />
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
    </main>
  )
}

export default Post
