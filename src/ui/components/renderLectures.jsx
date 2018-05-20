import React from 'react'

export const renderLectures = ({
  dirty,
  error,
  warning
}) => {
  if (dirty && error) {
    return (
      <p className="error">{error}</p>
    )
  }
  if (dirty && warning) {
    return (
      <p className="warning">{warning}</p>
    )
  }
}


