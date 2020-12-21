import React from 'react'
import { Button, TextField } from '@material-ui/core'

import logo from '../images/logo.png'
import '../styles/resetpassword.css'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../store'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const ResetPassword = () => {
  const query = useQuery()

  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [token, setToken] = React.useState('')

  React.useEffect(() => {
    setToken(query.get('reset_password_token'))
  }, [])

  const { resetPassword, resetPasswordError } = useStore()

  const handleReset = (e) => {
    e.preventDefault()
    resetPassword(password, confirmPassword, token)
  }

  return (
    <main className="ResetPassword">
      <img className="logo" src={logo} alt="" />
      <form onSubmit={handleReset}>
        <TextField
          className="login-input"
          name="password"
          htmlFor="password"
          value={password}
          label="Password"
          variant="outlined"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          className="login-input"
          name="confirm password"
          htmlFor="password"
          value={confirmPassword}
          label="Confirm Password"
          variant="outlined"
          type="password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {resetPasswordError && (
          <p className="inline-alert">{resetPasswordError}</p>
        )}
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
          Change Password
        </Button>
      </form>
      <span>
        <Link className="btn btn_asLink" to="/login">
          Login
        </Link>
      </span>
    </main>
  )
}

export default ResetPassword
