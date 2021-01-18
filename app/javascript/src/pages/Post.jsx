import React from 'react'
import { TextField, Button } from '@material-ui/core'

import Nav from '../components/Nav'
import DailyChallenge from '../components/DailyChallenge'
import '../styles/post.css'
import { useStore } from '../store'
import Layout from '../components/Layout'

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
    <Layout className="Post" resources={['team']}>
      <h2>Share your progress with your team</h2>
      <p>Earn bonus steps every day!</p>
      <form onSubmit={handleSubmit}>
        <label>
          Attach an Image:
          <input
            className="file-input"
            name="image"
            type="file"
            accept=".png,.jpg,.jpeg,.gif"
            required
          />
        </label>
        <TextField
          className="post-input"
          name="text"
          label="Caption (optional)"
          variant="outlined"
          type="number"
          multiline
          rows={4}
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
      <DailyChallenge />
    </Layout>
  )
}

export default Post
