import React, {
  PureComponent,
  Children
} from 'react'
import PropTypes from 'prop-types'

import { schemaTypeEx } from '../utils'
import { addSpecialTypeValidator } from '../validators'

export let components

/**
 * Allows to specify extra props for a field in runtime.
 */
export class FieldPropsOverride extends PureComponent {}

FieldPropsOverride.propTypes = {
  name: PropTypes.string.isRequired
}

/**
 * Searches in children to find overrides.
 */
const searchForOverrides = (parent, name, children = []) => {
  const childrenArr = Children.map(children, child => child)

  return childrenArr.reduce((override, child) => {
    const childName = child.props.name
    const compositeName = parent ? `${parent}.${name}` : name

    if (child.type == FieldPropsOverride && compositeName == childName)
      return child.props
    else
      return override
  }, {})
}

/**
 * Renders a single field.
 *
 * @param {object} params
 * @param {string} params.field Name of the field
 * @param {object} params.fieldSchema Schema specification
 *    for the field
 * @param {string} params.parent Prefix of the field name
 * @param {string} params.schemaTypeName Name of the schema
 *    (first argument while instantiating a schema)
 * @param {object} params.config Form configuration
 * @param {...object} params.rest props passed to the component
 */
export const renderInput = ({
  field,
  fieldSchema,
  fieldSchema: {
    type,
    required
  },
  parent,
  containerField,
  propOverrides,
  schemaTypeName,
  config = {},
  ...rest
}) => {
  const strType = schemaTypeEx(type)
  const control = components[strType]
  if (control) {
    const Component = control.component

    const useField = parent ? `${parent}.${field}` : field

    const baseProps = {
      key: useField,
      name: useField,
      field,
      fieldSchema,
      schemaTypeName,
      config,
      containerField,
      propOverrides,
      ...rest,
      ...searchForOverrides(containerField, useField, propOverrides)
    }

    const { props } = control
    let componentProps
    if (typeof props == 'function')
      componentProps = props ? props(baseProps) : baseProps
    else
      componentProps = { ...baseProps, ...props }

    return (
      <Component
        {...componentProps}
      />
    )
  } else
    return null
}

/**
 * Renders the inputs to make the schema work.
 *
 * @param {object} params
 * @param {Schema} params.schema Schema instance
 * @param {object} params.config Rendering configuration
 * @param {string} params.config.arrayMode 'panels' or 'table'
 * @param {boolean} params.config.horizontal Labels above inputs
 * @param {...object} params.rest Props passed to each input
 *
 * @returns {array} React elements with the form and inputs.
 */
export const renderInputs = ({
  schema,
  config = {},
  children,
  propOverrides,
  ...rest
}) => {
  const schemaDef = schema.getSchema()
  const schemaKeys = Object.keys(schemaDef)

  return schemaKeys.map(field =>
    renderInput({
      ...rest,
      field,
      config,
      propOverrides: propOverrides || children,
      fieldSchema: schemaDef[field],
      schemaTypeName: schema.getType()
    })
  )
}

/**
 * Sets the whole skin at once.
 *
 * @param {object} skin Whole skin description
 */
export const setSkin = skin => {
  components = skin
}

/**
 * Sets the rendering for a specific schema type.
 *
 * @param {string} typeName Type name as it appears
 *    in the schema specification.
 * @param {skinTypeMap} rendering Object with the
 *    rendering specification.
 */
export const addSkinType = (typeName, rendering) => {
  components[typeName] = rendering
  if (rendering.typeValidator)
    addSpecialTypeValidator(typeName, rendering.typeValidator)
}

export const getComponents = () => components
