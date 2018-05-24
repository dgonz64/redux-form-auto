import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
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
export const InputArrayWrap = ({
  name,
  children,
  newObject,
  arrayHandler,
  ...rest
}) => {
  return (
    <FieldArray
      name={name}
      component={arrayHandler}
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

InputArrayWrap.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.array.isRequired,
  newObject: PropTypes.object
}

