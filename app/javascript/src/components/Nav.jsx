import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import logo from '../images/wide-logo.png'
import { useStore } from '../store'
import '../styles/nav.css'

const Nav = () => {
  const { currentUser } = useStore()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    // TODO:
    console.log('logout')
  }

  return (
    <div className="nav">
      <div className="nav-title">
        <Link to="/">
          <img className="nav-logo" src={logo} alt="" />
        </Link>
      </div>

      {currentUser && currentUser.admin ? (
        <div className="nav-right">
          <Button
            style={{ verticalAlign: 'baseline' }}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}>
            <MenuIcon fontSize={'default'} style={{ color: 'black' }} />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={handleClose}>
              <Link className="nav-link" to="/admin">
                Contests
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className="nav-link" to="/admin/challenges">
                Challenges
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className="nav-link" to="/admin/rules">
                Rules
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className="nav-link" to="/admin/faq">
                FAQ
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      ) : !currentUser ? null : (
        <div className="nav-right">
          <Button
            style={{ verticalAlign: 'baseline' }}
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}>
            <MenuIcon fontSize={'default'} style={{ color: 'black' }} />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={handleClose}>
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className="nav-link" to="/addphoto">
                Add Photo
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className="nav-link" to="/addsteps">
                Add Steps
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className="nav-link" to="/team">
                Team Page
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link className="nav-link" to="/rules">
                Rules
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  )
}

export default Nav
