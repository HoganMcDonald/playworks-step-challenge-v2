import React from 'react'
import { Button, TextField } from '@material-ui/core'

import logo from '../images/logo.png'
import '../styles/signup.css'
import { Link } from 'react-router-dom'
import { useStore } from '../store'

const Signup = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const { signup, signupError } = useStore()

  const handleRegister = (e) => {
    e.preventDefault()

    const avatar = e.target['avatar'].files[0]
    const formData = new FormData()
    formData.append('avatar', avatar)

    signup(email, password, name, formData)
  }

  return (
    <main className="Signup">
      <img className="logo" src={logo} alt="" />
      <form onSubmit={handleRegister}>
        <TextField
          className="login-input"
          name="name"
          value={name}
          label="Name"
          variant="outlined"
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          className="file-input"
          name="avatar"
          type="file"
          accept=".png,.jpg,.jpeg,.gif"
          required
        />
        {signupError && <p className="inline-alert">{signupError}</p>}
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
          Register
        </Button>
      </form>
      <Link className="btn btn_asLink" to="/login">
        Login
      </Link>
    </main>
  )
}

export default Signup
