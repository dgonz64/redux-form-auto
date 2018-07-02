import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import { trModel } from '../../translation_utils'
import { arrLast } from '../../utils'

class InputBase extends Component {
  focus() {
    this.inputControl.focus()
  }

  render() {
    const {
      children,
      input,
      inputWrapper,
      inputComponent,
      required,
      config,
      config: {
        horizontal
      },
      elementOnly,
      inline,
      type,
      autoFocus,
      schemaTypeName,
      onKeyDown,
      onKeyPress,
      labelOverride,
      componentPropMap,
      meta,
      meta: {
        touched,
        error,
        warning
      },
      ...rest
    } = this.props

    const $wrapper = inputWrapper
    const $input = inputComponent || 'input'
    const inputIsClass = typeof inputComponent == 'function'
    const providedRest = componentPropMap ?
      componentPropMap(this.props) : (inputIsClass ? {
        ...rest,
        input,
        meta,
        config,
        autoFocus,
        schemaTypeName
      } : input)

    const noWrap = type == 'hidden' || elementOnly
    const fieldName = arrLast(input.name.split('.'))
    const label = typeof labelOverride != 'undefined' ?
      labelOverride : trModel(schemaTypeName, fieldName, '_field')
    const placeholder = noWrap ? label : null

    return (
      <$wrapper
        label={label}
        required={required}
        horizontal={horizontal}
        inline={inline}
        errorMessage={touched && error}
        warningMessage={touched && warning}
        elementOnly={noWrap}
      >
        <$input
          className="form-control"
          type={type || 'text'}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          {...providedRest}
          autoComplete="off"
          placeholder={placeholder}
          ref={element => this.inputControl = element}
        >
          {children}
        </$input>
      </$wrapper>
    )
  }
}

export class InputWrap extends Component {
  focus() {
    this.fieldElement.getRenderedComponent().focus()
  }

  render() {
    return (
      <Field
        component={InputBase}
        ref={el => this.fieldElement = el}
        withRef
        {...this.props}
      />
    )
  }
}

/**
 * Skin input propTypes.
 * @typedef {object} InputPropTypes
 */
InputWrap.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  fieldSchema: PropTypes.object,
  schemaTypeName: PropTypes.string.isRequired,
  label: PropTypes.string,
  inputComponent: PropTypes.any,
  required: PropTypes.bool,
  horizontal: PropTypes.bool,
  elementOnly: PropTypes.bool,
  type: PropTypes.string,
}
