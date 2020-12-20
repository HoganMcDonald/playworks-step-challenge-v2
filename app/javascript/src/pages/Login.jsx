import React from 'react'
import { Button, TextField } from '@material-ui/core'

import logo from '../images/logo.png'
import '../styles/login.css'
import { Link } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = () => {}

  return (
    <main className="Login">
      <img className="logo" src={logo} alt="" />
      <form onSubmit={handleLogin}>
        <TextField
          className="login-input"
          name="username"
          htmlFor="username"
          value={username}
          label="Username"
          variant="outlined"
          type="text"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
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
          Login
        </Button>
      </form>
      <span>
        <Link className="btn btn_asLink" to="/signup">
          New here? Register
        </Link>
        &nbsp; &nbsp;
        <Link className="btn btn_asLink" to="/forgot-password">
          Forgot Password
        </Link>
      </span>
    </main>
  )
}

export default Login
