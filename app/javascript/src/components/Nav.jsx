import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Menu, MenuItem, Avatar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import logo from '../images/wide-logo.png'
import { useStore } from '../store'
import '../styles/nav.css'

const Nav = () => {
  const { currentUser, logout } = useStore()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (path) => {
    if (path) history.push(path)
    setAnchorEl(null)
  }

  const handleLogout = logout

  return (
    <div className="nav">
      <div className="nav-title">
        <Link to="/">
          <img className="nav-logo" src={logo} alt="" />
        </Link>
      </div>

      {!currentUser ? null : (
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
            <MenuItem onClick={() => handleClose('/')}>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose('/post')}>
              <Link className="nav-link" to="/post">
                Daily Challenge
              </Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose('/steps')}>
              <Link className="nav-link" to="/steps">
                Add Steps
              </Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose('/team/home')}>
              <Link className="nav-link" to="/team/home">
                My Team
              </Link>
            </MenuItem>
            <MenuItem onClick={() => handleClose('/rules')}>
              <Link className="nav-link" to="/rules">
                Rules
              </Link>
            </MenuItem>
            {currentUser.role === 'admin' && (
              <MenuItem onClick={() => handleClose('/admin')}>
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  )
}

export default Nav
