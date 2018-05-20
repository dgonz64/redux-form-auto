import React from 'react'

import {
  Schema,
  Autoform,
  addTranslations,
  setLanguageByName
} from 'redux-form-auto'

addTranslations({
  models: {
    config: {
      arrayMode: {
        _: 'Array mode',
        table: 'Table',
        panel: 'Panels'
      },
      horizontal: 'Horizontal'
    }
  }
})

const configSchema = new Schema('config', {
  arrayMode: {
    type: 'radios',
    options: ['table', 'panel']
  },
  horizontal: {
    type: 'boolean'
  }
})

export const DemoConfig = ({
  onChange,
  config
}) =>
  <Autoform
    schema={configSchema}
    onChange={onChange}
    config={config}
  />
