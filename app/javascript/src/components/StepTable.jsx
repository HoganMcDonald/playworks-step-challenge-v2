import React from 'react'
import moment from 'moment'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import { useStore } from '../store'

const StepTable = ({ steps }) => {
  const { currentUser, deleteSteps } = useStore()

  const handleDelete = React.useCallback(
    (stepId) => {
      deleteSteps(stepId)
    },
    [deleteSteps],
  )

  const canDelete = React.useMemo(() => {
    return (step) =>
      step.userId == currentUser.id || currentUser.role === 'admin'
  }, [currentUser])

  return (
    <>
      <h2>Daily Steps</h2>
      <table style={{ maxWidth: '80ch' }}>
        <thead>
          <tr>
            <th style={{ width: '1%' }}></th>
            <th>Name</th>
            <th>Steps</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((step) => (
            <tr key={step.id}>
              <td style={{ width: '1%' }}>
                {canDelete(step) && (
                  <DeleteForeverIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(step.id)}
                  />
                )}
              </td>
              <td>{step.name}</td>
              <td>{step.sum}</td>
              <td>{moment(step.date).format('MMM DD, YY')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default StepTable
