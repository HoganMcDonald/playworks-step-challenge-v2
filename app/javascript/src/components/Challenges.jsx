import React from 'react'
import moment from 'moment'
import { Box, Card, Grid } from '@material-ui/core'
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
                  <Box display="inline">
                    {canDelete(item) && (
                      <DeleteForeverIcon
                        style={{
                          cursor: 'pointer',
                          position: 'absolute',
                          left: '0',
                          top: '0',
                          fill: '#418cc7',
                        }}
                        onClick={() => handleDelete(item.id)}
                      />
                    )}
                    <h5 style={{ marginTop: '1rem' }}>
                      {item.name} - {moment(item.date).format('MMM DD, Y')}
                    </h5>
                    <img
                      src={item.image}
                      alt=""
                      style={{
                        height: 'auto',
                        maxHeight: '16rem',
                        maxWidth: 'calc(100% - 1rem)',
                      }}
                    />
                    <p style={{ fontWeight: 500 }}>{item.text}</p>
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
