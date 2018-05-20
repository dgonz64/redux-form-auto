import React, { PureComponent } from 'react'
import { Field } from 'redux-form'

import { trModel } from '../../translate'

export const mapRadioOptions = ({
  name,
  schemaTypeName,
  fieldSchema: {
    options
  }
}) =>
  options.map(op => {
    const label = trModel(schemaTypeName, name, op)

    return (
      <span key={op}>
        <Field
          name={name}
          component="input"
          type="radio"
          value={op}
        />
        {` ${label} `}
      </span>
    )
  })

export class Radio extends PureComponent {
  render() {
    return (
      <div key={this.props.name}>
        {this.props.children}
      </div>
    )
  }
}
