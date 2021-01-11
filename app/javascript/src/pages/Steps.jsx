import React from 'react'
import { Button, TextField } from '@material-ui/core'

import '../styles/steps.css'
import Nav from '../components/Nav'
import { useStore } from '../store'
import StepTable from '../components/StepTable'

const Steps = () => {
  const [count, setCount] = React.useState(0)

  const { createSteps, createStepsError, steps } = useStore()

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault()
      createSteps(count)
    },
    [count],
  )

  return (
    <>
      <main className="Steps">
        <Nav />
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: '2rem', padding: '1rem' }}>
          <TextField
            className="steps-input"
            name="count"
            value={count}
            label="Steps"
            variant="outlined"
            type="number"
            required
            onChange={(e) => setCount(e.target.value)}
          />
          {createStepsError && (
            <p className="inline-alert">{createStepsError}</p>
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
            name="submit"
            value="Log In">
            Submit
          </Button>
        </form>
        <StepTable steps={steps} />
      </main>
    </>
  )
}

export default Steps
