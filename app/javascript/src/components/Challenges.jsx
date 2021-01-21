import React from 'react'
import { Grid } from '@material-ui/core'

import { useStore } from '../store'
import DailyChallenge from './DailyChallenge'
import '../styles/challenges.css'
import PostTile from './PostTile'

const Challenges = ({ teamOnly }) => {
  const { posts, team, currentUser, deletePosts } = useStore()

  const items = React.useMemo(() => {
    return posts.filter((post) => !teamOnly || post.teamId == team.id)
  }, [posts, team, teamOnly])

  return (
    <div style={{ marginBottom: '3rem' }}>
      <DailyChallenge />
      <Grid container spacing={2} justify="center">
        {items.map((item, i) => (
          <Grid item key={i}>
            <PostTile item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Challenges
