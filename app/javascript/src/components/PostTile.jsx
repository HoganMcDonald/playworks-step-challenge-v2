import React from 'react'
import { Card } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import moment from 'moment'

import { useStore } from '../store'
import Avatar from './Avatar'

function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.src = url
  })
}

const PostTile = ({ item }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false)

  const { currentUser, deletePosts } = useStore()

  React.useEffect(() => {
    loadImage(item.image).then(() => {
      setImageLoaded(true)
    })
  }, [item])

  const handleDelete = React.useCallback(
    (postId) => {
      deletePosts(postId)
    },
    [deletePosts],
  )

  const canDelete = React.useMemo(() => {
    return (post) =>
      post.userId == currentUser.id ||
      currentUser.role === 'admin' ||
      post.captainId == currentUser.id
  }, [currentUser])

  return (
    <Card className="card-container">
      <div className="post-top-bar">
        <Avatar
          src={item.avatar}
          size="2.25rem"
          styles={{
            marginRight: '0.5rem',
          }}
        />
        <h5 style={{ margin: '0' }}>{item.name}</h5>
        {canDelete(item) && (
          <DeleteForeverIcon
            className="delete-icon"
            style={{
              cursor: 'pointer',
            }}
            onClick={() => handleDelete(item.id)}
          />
        )}
      </div>
      {imageLoaded ? (
        <img className="post-image" src={item.image} alt="" loading="lazy" />
      ) : (
        <div className="lazy-placeholder" />
      )}
      {item.text && (
        <p className="post-description" style={{ fontWeight: 500 }}>
          {item.text}
        </p>
      )}
      <p className="small-text">
        Posted on: {moment(item.createdAt).format('MMM D, Y')}
      </p>
    </Card>
  )
}

export default PostTile
