import React from 'react'
import moment from 'moment'
import { Box, Card, Grid } from '@material-ui/core'

import { useStore } from '../store'
import '../styles/challenges.css'

const Challenges = ({ teamOnly }) => {
  const { posts, team } = useStore()
  // TODO:

  const items = React.useMemo(() => {
    return posts.filter((post) => !teamOnly || post.teamId == team.id)
  }, [posts, team, teamOnly])

  const challenges = []
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div className="challengeOfTheDayHeadline">
        <h2>Challenge of the Day</h2>
      </div>
      <Grid container spacing={2} justify="center">
        {items.map((item, i) => (
          <Grid item>
            <Card key={i}>
              <div className="challengeOfTheDay">
                <div className="challengeOfTheDaySubtitleAndDescription">
                  <h5>
                    <Box display="inline">
                      <p style={{ marginTop: '1rem' }}>
                        {item.name} - {moment(item.date).format('MMM DD, Y')}
                      </p>
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          height: 'auto',
                          maxHeight: '6rem',
                          maxWidth: '100%',
                        }}
                      />
                      <p style={{ fontWeight: 500 }}>{item.text}</p>
                    </Box>
                  </h5>
                  <h5>{Card.text}</h5>
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
