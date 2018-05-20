import React from 'react'
import { reduxForm } from 'redux-form'
import { Schema, Autoform, addTranslations } from 'redux-form-auto'

addTranslations({
  models: {
    owner: {
      name: 'Owner\'s name',
      pets: 'Owned pets'
    },
    pet: {
      name: 'Pet\'s name'
    }
  },
  add: 'Add'
})

export const DemoForm = ({ code, config }) => {
  let gibberish,
    schema

  try {
    gibberish = new Function('Schema', code)
    schema = gibberish(Schema)

    return (
      <Autoform
        schema={schema}
        form="demo"
        destroyOnUnmount={false}
        config={config}
      />
    )
  } catch (err) {
    return <pre>{err.toString()}</pre>
  }
}
