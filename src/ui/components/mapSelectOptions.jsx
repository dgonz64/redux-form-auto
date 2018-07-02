import React from 'react'
import { trModel } from '../../translation_utils'

export const mapSelectOptions = (model, field, options) =>
  options.map(op =>
    <option
      key={op}
      value={op}
    >
      {trModel(model, field, op)}
    </option>
  )
