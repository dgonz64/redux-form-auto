import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { FieldArray } from 'redux-form'
import { mergeInitialValues } from '../../utils'

const instrumentChildren = ({
  field,
  idx,
  children
}) => {
  return children.map((child, inputIdx) => {
    const { name, ...rest } = child.props

    const newName = `${field}.${name}`

    return cloneElement(child, {
      name: newName,
      key: inputIdx,
      ...rest
    })
  })
}

const handleAdd = (schema, fields, newObject = {}) => {
  const useObject = mergeInitialValues(newObject, schema)
  fields.push(useObject)
}

const handleRemove = (fields, idx) => {
  fields.remove(idx)
}

/**
 * Used for the arrays in models, for
 * example clients: [Clients]
 *
 */
export const InputArrayWrap = ({
  name,
  children,
  propOverrides,
  newObject,
  arrayHandler,
  fieldSchema,
  ...rest
}) => {
  const schema = fieldSchema.type[0]

  return (
    <FieldArray
      name={name}
      component={arrayHandler}
      onAdd={handleAdd.bind(null, schema)}
      onRemove={handleRemove}
      instrumentChildren={instrumentChildren}
      newObject={newObject}
      {...rest}
    >
      {children}
    </FieldArray>
  )
}

InputArrayWrap.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.array.isRequired,
  newObject: PropTypes.object
}
