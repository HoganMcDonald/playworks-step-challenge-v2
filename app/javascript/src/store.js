import React from 'react'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
  user: null,
}

const slice = createSlice({
  name: 'default',
  initialState,
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        user: action.payload,
      }
    },
  },
})

const store = configureStore({
  reducer: slice.reducer,
  devTools: process.env.NODE_ENV === 'development',
})

export default store

const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute('content')

const get = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': token,
    },
  })
  let json
  if (response.status !== 204) {
    json = await response.json()
  }
  if (response.status === 401) {
    window.location.href = '/login'
  }
  if (response.status >= 400) {
    return [null, json]
  } else {
    return [json, null]
  }
}

const post = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': token,
    },
    body: JSON.stringify(body),
  })
  let json
  if (response.status !== 204) {
    json = await response.json()
  }
  if (response.status === 401) {
    window.location.href = '/login'
  }
  if (response.status >= 400) {
    return [null, json]
  } else {
    return [json, null]
  }
}

const put = async (url, body) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': token,
    },
    body: JSON.stringify(body),
  })
  let json
  if (response.status !== 204) {
    json = await response.json()
  }
  if (response.status === 401) {
    window.location.href = '/login'
  }
  if (response.status >= 400) {
    return [null, json]
  } else {
    return [json, null]
  }
}

export const useStore = () => {
  const dispatch = useDispatch()

  // getters
  const currentUser = useSelector((state) => state.user)

  // actions
  const loadUser = React.useCallback(
    (user) => {
      dispatch(slice.actions.setUser(user))
    },
    [dispatch],
  )

  const [loginLoading, setLoginLoading] = React.useState(false)
  const [loginError, setLoginError] = React.useState('')
  const login = React.useCallback(
    async (email, password) => {
      if (loginLoading) {
        return
      }
      setLoginLoading(true)
      setLoginError('')
      try {
        const [response, error] = await post('/users/sign_in.json', {
          email,
          password,
        })
        setLoginLoading(false)
        if (error) {
          setLoginError(error.error)
        } else {
          console.log(response)
          window.location.href = '/'
        }
      } catch (error) {
        setLoginLoading(false)
        setLoginError(error.message)
      }
    },
    [loginLoading, loginError, dispatch],
  )

  const [signupLoading, setSignupLoading] = React.useState(false)
  const [signupError, setSignupError] = React.useState('')
  const signup = React.useCallback(
    async (email, password, name) => {
      if (signupLoading) {
        return
      }
      setSignupLoading(true)
      setSignupError('')
      try {
        const [response, error] = await post('/users.json', {
          user: {
            email,
            password,
            password_confirmation: password,
            name,
          },
        })
        setSignupLoading(false)
        if (error) {
          setSignupError(
            error.errors.name || error.errors.email || error.errors.password,
          )
        } else {
          window.location.href = '/login'
        }
      } catch (error) {
        setSignupLoading(false)
        setSignupError(error.message)
      }
    },
    [signupLoading, signupError, dispatch],
  )

  const [forgotPasswordLoading, setForgotPasswordLoading] = React.useState(
    false,
  )
  const [forgotPasswordError, setForgotPasswordError] = React.useState('')
  const forgotPassword = React.useCallback(async (email) => {
    if (forgotPasswordLoading) {
      return null
    }
    setForgotPasswordLoading(true)
    setForgotPasswordError('')
    try {
      const [response, error] = await post('/users/password.json', {
        user: { email },
      })
      setForgotPasswordLoading(false)
      if (error) {
        setForgotPasswordError('unable to reset password at this time.')
        return null
      } else {
        return response
      }
    } catch (error) {
      setForgotPasswordLoading(false)
      setForgotPasswordError(error.message)
      return null
    }
  }, [])

  const [resetPasswordLoading, setResetPasswordLoading] = React.useState(false)
  const [resetPasswordError, setResetPasswordError] = React.useState('')
  const resetPassword = React.useCallback(
    async (password, confirmPassword, token) => {
      if (resetPasswordLoading) {
        return null
      }
      setResetPasswordLoading(true)
      setResetPasswordError('')
      try {
        const [response, error] = await put('/users/password.json', {
          user: {
            password,
            password_confirmation: confirmPassword,
            reset_password_token: token,
          },
        })
        setResetPasswordLoading(false)
        if (error) {
          setResetPasswordError(
            error.errors.password ||
              error.errors.password_confirmation ||
              'unable to reset password at this time.',
          )
          return null
        } else {
          window.location.href = '/'
        }
      } catch (error) {
        setResetPasswordLoading(false)
        setResetPasswordError(error.message)
        return null
      }
    },
    [],
  )

  return {
    currentUser,
    loadUser,
    login,
    loginError,
    loginLoading,
    signup,
    signupError,
    signupLoading,
    forgotPassword,
    forgotPasswordError,
    resetPassword,
    resetPasswordError,
  }
}
