import React, { PureComponent } from 'react'
import { trModel } from '../../translation_utils'
import classnames from 'classnames'

export class Checkbox extends PureComponent {
  render() {
    const {
      input,
      input: { name },
      config,
      schemaTypeName 
    } = this.props

    const classes = classnames('checkbox', {
      'col-sm-offset-7': config.horizontal
    })

    return (
      <div className={classes}>
        <label>
          <input {...input} type="checkbox" />
          {trModel(schemaTypeName, name)}
        </label>
      </div>
    )
  }
}
