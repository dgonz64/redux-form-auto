import React from 'react'
import { PropTypes } from 'prop-types'
import classnames from 'classnames'

export const Icon = ({
  className,
  text = ''
}) => {
  const classes = classnames([
    'glyphicon',
    'glyphicon-' + className,
    { 'with-text': text }
  ])

  return (
    <span>
      <span className={classes} aria-hidden="true"></span>
      {text}
    </span>
  )
}

Icon.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string
}
