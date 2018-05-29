import React from 'react'

import { schemaTypeEx } from '../utils'
import { defaultSkin } from './defaultSkin'

export let components = defaultSkin

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
      ...rest
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
  ...rest
}) => {
  const schemaDef = schema.getSchema()
  const schemaKeys = Object.keys(schemaDef)
  return schemaKeys.map(field =>
    renderInput({
      ...rest,
      field,
      config,
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
}
