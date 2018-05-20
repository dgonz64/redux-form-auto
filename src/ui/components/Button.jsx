import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Icon } from './Icon'

const renderContent = ({
  iconClass,
  text
}) => {
  if (iconClass) {
    return (
      <Icon
        className={iconClass}
        text={text}
      />
    )
  } else
    return text
}

const buttonType = ({ submit }) => submit ? 'submit' : 'button'

const handleClick = ({
  disabled,
  onClick
}, e) => {
  if (!disabled && onClick)
    onClick(e)
}

export const Button = ({
  text = '',
  onFocus,
  onClick,
  className,
  iconClass,
  submit,
  disabled,
  small,
  extraSmall
}) => {
  const buttonClass = className || 'btn-default'
  const classes = classnames(
    'btn',
    buttonClass,
    {
      disabled,
      'btn-sm': small,
      'btn-xs': extraSmall,
    }
  )

  return (
    <button
      type={buttonType({ submit })}
      className={classes}
      onClick={handleClick.bind(null, { disabled, onClick })}
      onFocus={onFocus}
    >
      {renderContent({ iconClass, text })}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  iconClass: PropTypes.string,
  submit: PropTypes.bool,
  disabled: PropTypes.bool
}
