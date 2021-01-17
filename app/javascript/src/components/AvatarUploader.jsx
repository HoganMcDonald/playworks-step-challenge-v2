import React from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Modal, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const AvatarUploader = ({ image, type, containerSize, editable }) => {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault()

    const avatar = e.target['avatar'].files[0]
    const formData = new FormData()
    formData.append('avatar', avatar)

    await fetch(`/upload-${type}-avatar`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
    window.location.reload()
  })

  return !image && !editable ? null : (
    <span style={{ position: 'relative', marginBottom: '1rem' }}>
      {image ? (
        <img
          src={image}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            width: 'auto',
            height: 'auto',
            margin: '0',
            ...containerSize,
          }}
        />
      ) : (
        <p
          style={{
            background: '#7b7e81',
            color: '#fff',
            padding: '8px 4px',
            marginBottom: '6px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          onClick={() => setOpen(true)}>
          Upload a {type} Image
        </p>
      )}
      {editable && (
        <CloudUploadIcon
          style={{
            position: 'absolute',
            right: '-10px',
            bottom: '-2px',
            cursor: 'pointer',
          }}
          onClick={() => setOpen(true)}
        />
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <h5>Upload Team Photo</h5>
            <input
              className="file-input"
              name="avatar"
              type="file"
              accept=".png,.jpg,.jpeg,.gif"
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
              name="submit">
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </span>
  )
}

export default AvatarUploader
