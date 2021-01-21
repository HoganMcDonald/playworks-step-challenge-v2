import React from 'react'
import { Button, TextField } from '@material-ui/core'

import '../styles/steps.css'
import { useStore } from '../store'
import StepTable from '../components/StepTable'
import Layout from '../components/Layout'

const Steps = () => {
  const [count, setCount] = React.useState(0)
  const [date, setDate] = React.useState('')

  const { createSteps, createStepsError, steps } = useStore()

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault()
      createSteps(count, date)
    },
    [count, date],
  )

  return (
    <Layout className="Steps" resources={['team']}>
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
        <TextField
          className="steps-input"
          name="date"
          value={date}
          label="Date"
          variant="outlined"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          required
          onChange={(e) => setDate(e.target.value)}
        />
        {createStepsError && <p className="inline-alert">{createStepsError}</p>}
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
    </Layout>
  )
}

export default Steps
