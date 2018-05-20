import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const renderHeader = (header) => {
  if (header) {
    return (
      <div className="panel-heading">
        {header}
      </div>
    )
  } else
    return null
}

const getClasses = ({ panelType, className }) => {
  const type = panelType || 'default'
  const buttonClass = className || ''
  return classnames('panel', 'panel-' + type, buttonClass)
}

export const Panel = ({
  header,
  table = null,
  className,
  panelType,
  onClick,
  children
}) => {
  const classes = getClasses({ panelType, className })

  return (
    <div
      className={classes}
      onClick={onClick}
    >
      {renderHeader(header)}
      <div className="panel-body">
        {children}
      </div>
      {table}
    </div>
  )
}

Panel.propTypes = {
  header: PropTypes.node,
  table: PropTypes.node,
  className: PropTypes.string,
  panelType: PropTypes.string,
  onClick: PropTypes.func
}
