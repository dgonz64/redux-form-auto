import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { getComponents, renderInputs } from './componentRender'
import { mergeInitialValues } from '../utils'

/**
 * Creates a form using the current skin. The form
 * has all the needed fields, styles and validation
 * errors needed for it to function.
 */
export class Autoform extends Component {
  constructor(props) {
    super(props)

    // Allow for the skin to be set up
    const components = getComponents()
    this.Form = components.form.component
    this.ConnectedForm = reduxForm()(this.Form)
  }

  /**
   * Call submit in order to submit imperativelly. onSubmit
   * will be called with the form data.
   */
  submit() {
    this.formComponent.submit()
  }

  render() {
    const {
      form,
      schema,
      noErrors,
      noWarns,
      noTranslate,
      noConnect,
      formProps,
      elementProps,
      initialValues,
      children,
      ...rest
    } = this.props

    const formName = form || schema.getType() || 'def'

    const errorer = noErrors ?
      null : (noTranslate ?
        schema.getErrorValidator()
        : schema.getTranslatedErrorValidator())

    const warner = noWarns ?
      null : (noTranslate ?
        schema.getWarningValidator()
        : schema.getTranslatedWarningValidator())

    const $formComponent = noConnect ? this.Form : this.ConnectedForm

    const mergedInitial = mergeInitialValues(initialValues, schema)

    return (
      <$formComponent
        form={formName}
        validate={doc => errorer(doc, rest)}
        warn={doc => warner(doc, rest)}
        initialValues={mergedInitial}
        {...rest}
        {...formProps}
        ref={el => this.formComponent = el}
      >
        {renderInputs({ schema, ...rest, ...elementProps })}
        {children}
      </$formComponent>
    )
  }
}

Autoform.propTypes = {
  /**
   * The schema used to infer the fields.
   */
  schema: PropTypes.object.isRequired,

  /**
   * Optional name for the form. If not provided
   * it will use Schema's name.
   */
  form: PropTypes.string,

  /** Disable error reports */
  noErrors: PropTypes.bool,

  /** Disable warning reports */
  noWarns: PropTypes.bool,

  /** Don't translate text */
  noTranslate: PropTypes.bool,

  /**
   * Don't connect form to ReduxForm. It's up
   * to you when or where you use reduxForm HoC.
   */
  noConnect: PropTypes.bool,

  /**
   * Called on submit with the values of the form.
   */
  onSubmit: PropTypes.func,

  /**
   * Children will be rendered inside the form
   */
  children: PropTypes.node,
}
