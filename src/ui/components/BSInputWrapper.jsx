import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const renderLabel = props => {
  const labelClasses = classnames(
    'control-label',
    {
      ['col-sm-4']: props.horizontal
    }
  )
  return (
    <label className={labelClasses} data-required={props.required}>
      {props.label}
    </label>
  )
}

const renderError = (message) => {
  if (message) {
    return (
      <span className="help-block">
        {message}
      </span>
    )
  } else
    return null
}

const renderElement = (props, wrapperClasses) =>
  <div className={wrapperClasses}>
    {props.children}
    {renderError(props.errorMessage || props.warningMessage)}
  </div>

export const BSInputWrapper = props => {
  const label = props.label ? renderLabel(props) : null
  const wrapperClasses = props.wrapperClassName || classnames({
    'col-sm-7': props.horizontal && !props.inline,
    'col-sm-10': props.inline
  })
  const groupClasses = classnames(
    'form-group',
    {
      'has-error': props.errorMessage,
      'has-warning': props.warningMessage
    }
  )

  const element = renderElement(props, wrapperClasses)

  if (props.elementOnly) {
    return (
      <div className={groupClasses} >
        {element}
      </div>
    )
  } else {
    return (
      <div className={groupClasses}>
        {label}
        {element}
      </div>
    )
  }
}

BSInputWrapper.propTypes = {
  label: PropTypes.string,
  horizontal: PropTypes.bool,
  required: PropTypes.bool,
  elementOnly: PropTypes.bool,
  inline: PropTypes.bool,
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.any,
  warningMessages: PropTypes.any,
}
