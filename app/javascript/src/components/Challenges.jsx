import React from 'react'

import { useStore } from '../store'
import DailyChallenge from './DailyChallenge'
import '../styles/challenges.css'
import PostTile from './PostTile'
import PostGrid from './PostGrid'

const Challenges = ({ teamOnly, contestId }) => {
  const [touch, setTouch] = React.useState(Date.now())

  const {
    posts,
    team,
    postLastPage,
    postCurrentPage,
    currentUser,
    getPosts,
  } = useStore()

  const handleLoad = React.useCallback(() => {
    setTouch(Date.now())
  }, [])

  const items = React.useMemo(() => {
    return posts.filter((post) => !teamOnly || post.teamId == team.id)
  }, [posts, team, teamOnly])

  return (
    <div style={{ marginBottom: '3rem' }}>
      <DailyChallenge />
      <PostGrid
        initialLoad={false}
        hasMore={postCurrentPage < postLastPage}
        loadMore={() =>
          getPosts(
            contestId || currentUser.currentContestId,
            postCurrentPage + 1,
          )
        }
        touch={touch}>
        {items.map((item, i) => (
          <PostTile key={i} item={item} onLoad={handleLoad} />
        ))}
      </PostGrid>
    </div>
  )
}

export default Challenges
