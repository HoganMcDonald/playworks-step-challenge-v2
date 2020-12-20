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
      <h1>Login</h1>
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
          onChange={setUsername}
        />
        <TextField
          className="login-input"
          name="password"
          htmlFor="password"
          value={password}
          label="Username"
          variant="outlined"
          type="text"
          required
          onChange={setPassword}
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
      <Link className="btn btn_asLink" to="/signup">
        New here? Register
      </Link>
    </main>
  )
}

export default Login
