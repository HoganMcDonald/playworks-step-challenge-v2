import React from 'react'
import { Grid } from '@material-ui/core'

import Nav from '../components/Nav'
import { useStore } from '../store'

const Rules = () => {
  const { rules, faq } = useStore()

  return (
    <main className="Rules">
      <Nav />
      <Grid
        container
        direction="column"
        alignItems="center"
        className="rulesFaq">
        <h2>Rules</h2>
        <p>{rules}</p>
        <h2>Faq</h2>
        <p>{faq}</p>
      </Grid>
    </main>
  )
}

export default Rules
