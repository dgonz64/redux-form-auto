import React from 'react'
import classnames from 'classnames'

export const Form = (props) => {
  const {
    className,
    config = {},
    children
  } = props

  const { horizontal } = config

  const classes = classnames(
    className,
    {
      'form-horizontal': horizontal
    }
  )

  return (
    <form className={classes}>
      {children}
    </form>
  )
}
