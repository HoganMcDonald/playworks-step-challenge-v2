import React from 'react'
import { Button, TextField } from '@material-ui/core'

import logo from '../images/logo.png'
import '../styles/forgotpassword.css'
import { Link } from 'react-router-dom'
import { useStore } from '../store'

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('')
  const [sent, setSent] = React.useState(false)

  const { forgotPassword, forgotPasswordError } = useStore()

  const handleReset = (e) => {
    e.preventDefault()
    forgotPassword(email).then((res) => {
      if (res) setSent(true)
    })
  }

  return (
    <main className="ForgotPassword">
      <img className="logo" src={logo} alt="" />
      {!sent && (
        <form onSubmit={handleReset}>
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
      )}
      {sent && (
        <p>
          Instructions were sent to your email if we have an account with that
          email in our system.
        </p>
      )}
      {forgotPasswordError && (
        <p className="inline-alert">{forgotPasswordError}</p>
      )}
      <span>
        <Link className="btn btn_asLink" to="/login">
          Login
        </Link>
      </span>
    </main>
  )
}

export default ForgotPassword
