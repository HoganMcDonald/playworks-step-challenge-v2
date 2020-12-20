import React from 'react'
import { Button, TextField } from '@material-ui/core'

import logo from '../images/logo.png'
import '../styles/forgotpassword.css'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('')

  const handleLogin = () => {}

  return (
    <main className="ForgotPassword">
      <img className="logo" src={logo} alt="" />
      <form onSubmit={handleLogin}>
        <TextField
          className="login-input"
          name="email"
          htmlFor="email"
          value={email}
          label="Email"
          variant="outlined"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
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
          name="submit"
          value="Log In">
          Submit
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

export default ForgotPassword
