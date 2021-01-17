import React from 'react'
import moment from 'moment'

const StepTable = ({ steps }) => {
  return (
    <>
      <h2>Daily Steps</h2>
      <table style={{ maxWidth: '80ch' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>steps</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((step) => (
            <tr key={step.id}>
              <td>{step.name}</td>
              <td>{step.sum}</td>
              <td>{moment(step.createdAt).format('MMM DD, YY')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default StepTable