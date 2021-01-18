import React from 'react'
import { Box, Card, Grid, Avatar } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import { useStore } from '../store'
import DailyChallenge from './DailyChallenge'
import '../styles/challenges.css'

const Challenges = ({ teamOnly }) => {
  const { posts, team, currentUser, deletePosts } = useStore()

  const handleDelete = React.useCallback(
    (postId) => {
      deletePosts(postId)
    },
    [deletePosts],
  )

  const items = React.useMemo(() => {
    return posts.filter((post) => !teamOnly || post.teamId == team.id)
  }, [posts, team, teamOnly])

  const canDelete = React.useMemo(() => {
    return (post) =>
      post.userId == currentUser.id ||
      currentUser.role === 'admin' ||
      post.captainId == currentUser.id
  }, [currentUser])

  const challenges = []
  return (
    <div style={{ marginBottom: '3rem' }}>
      <DailyChallenge />
      <Grid container spacing={2} justify="center">
        {items.map((item, i) => (
          <Grid item key={i}>
            <Card>
              <div className="challengeOfTheDay">
                <div
                  className="challengeOfTheDaySubtitleAndDescription"
                  style={{ position: 'relative' }}>
                  <Box display="block">
                    <Avatar
                      src={item.avatar}
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        left: '0.5rem',
                      }}
                    />
                    <h5 style={{ marginTop: '1rem' }}>{item.name}</h5>
                    <img
                      src={item.image}
                      alt=""
                      style={{
                        height: 'auto',
                        maxHeight: '16rem',
                        maxWidth: 'calc(100% - 1rem)',
                      }}
                    />
                    {item.text && (
                      <p style={{ fontWeight: 500 }}>{item.text}</p>
                    )}
                    {canDelete(item) && (
                      <DeleteForeverIcon
                        style={{
                          cursor: 'pointer',
                          margin: 'auto',
                          display: 'block',
                        }}
                        onClick={() => handleDelete(item.id)}
                      />
                    )}
                  </Box>
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Challenges
