import React, { cloneElement } from 'react'
import { PropTypes } from 'prop-types'
import { Panel } from './Panel'
import { Button } from './Button'
import { renderLectures } from './renderLectures'

import { tr } from '../../translate'

const renderCloser = ({ fields, idx, onRemove }) =>
  <Button
    iconClass="trash"
    onClick={onRemove.bind(null, fields, idx)}
    className="btn-danger"
    small
  />

const addRemove = ({
  field,
  idx,
  total,
  children,
  instrumentChildren,
  onRemove,
  fields
}) => {
  const instrumented = instrumentChildren({ field, idx, total, children })
  const closer = renderCloser({ fields, idx, onRemove })
  const childrenAndClose = [closer, ...instrumented]

  return childrenAndClose.map((child, childIdx) => {
    const inlinedChild = cloneElement(child, {
      elementOnly: true,
      inline: true
    })

    return (
      <td
        key={childIdx}
        className={`form-col-${childIdx + 1}`}
      >
        {inlinedChild}
      </td>
    )
  })
}

const renderInputs = (props) => {
  // Discard add
  const total = props.fields.length - 1

  return props.fields.map((field, idx) =>
    <tr key={idx}>
      {addRemove({ field, idx, total, ...props })}
    </tr>
  )
}

const renderTable = props =>
  <table className="table table-striped">
    <tbody>
      {renderInputs(props)}
    </tbody>
  </table>

const renderHeader = (onFocus, onAdd) =>
  <Button
    className="btn-success"
    onFocus={onFocus}
    onClick={onAdd}
    iconClass="plus"
    text={tr('add')}
    small
  />

export const InputArrayTable = (props) => {
  const {
    onAdd,
    fields,
    newObject,
    addOnButtonFocus,
    meta
  } = props

  const boundAdd = onAdd.bind(null, fields, newObject)
  const onFocus = addOnButtonFocus ? boundAdd : null

  return (
    <Panel table={renderTable(props)} header={renderHeader(onFocus, boundAdd)}>
      {renderLectures(meta)}
    </Panel>
  )
}

