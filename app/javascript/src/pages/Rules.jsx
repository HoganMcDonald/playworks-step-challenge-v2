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
        className="rulesFaq"
        style={{ maxWidth: '90ch' }}>
        <h1>Rules</h1>
        <div dangerouslySetInnerHTML={{ __html: rules }} />
        <h1>FAQ</h1>
        <div dangerouslySetInnerHTML={{ __html: faq }} />
      </Grid>
    </main>
  )
}

export default Rules
