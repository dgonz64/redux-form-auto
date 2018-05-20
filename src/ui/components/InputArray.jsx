import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { InputArrayPanel } from './InputArrayPanel'
import { InputArrayTable } from './InputArrayTable'
import { FieldArray } from 'redux-form'

const instrumentChildren = ({
  field,
  idx,
  total,
  children
}) => {
  return children.map((child, inputIdx) => {
    const { name, ...rest } = child.props

    const newName = `${field}.${name}`

    return cloneElement(child, {
      name: newName,
      key: inputIdx,
      inputArrayIdx: idx,
      inputArrayTotal: total,
      ...rest
    })
  })
}

const handleAdd = (fields, newObject = {}) => {
  fields.push(newObject)
}

const handleRemove = (fields, idx) => {
  fields.remove(idx)
}

/**
 * Used for the arrays in models, for
 * example clients: [Clients]
 *
 */
export const InputArray = ({
  name,
  children,
  type,
  newObject,
  ...rest
}) => {
  const Handler = type == "table" ? InputArrayTable : InputArrayPanel

  return (
    <FieldArray
      name={name}
      component={Handler}
      onAdd={handleAdd}
      onRemove={handleRemove}
      instrumentChildren={instrumentChildren}
      newObject={newObject}
      {...rest}
    >
      {children}
    </FieldArray>
  )
}

InputArray.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.array.isRequired,
  newObject: PropTypes.object
}

