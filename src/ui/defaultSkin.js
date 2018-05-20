import * as components from './components/index'

import { renderInputs } from './componentRender'

/**
 * Data brick used to create a component for a type.
 *
 * @typedef {object} skinTypeMap
 * @property {Component} component
 * @property {function|object} props
 */

export const defaultSkin = {
  form: {
    component: components.Form,
    props: {}
  },
  string: {
    component: components.Input,
    props: {
      inputComponent: 'input'
    }
  },
  number: {
    component: components.Input,
    props: {
      inputComponent: 'input',
      type: 'number'
    }
  },
  array: {
    component: components.InputArray,
    props: props => {
      const {
        config = {},
        fieldSchema: { type }
      } = props

      const { arrayMode } = config

      return {
        ...props,
        type: arrayMode,
        children: renderInputs({ schema: type[0], config })
      }
    }
  },
  schema: {
    component: components.Submodel,
  },
  select: {
    component: components.Input,
    props: props => {
      const {
        fieldSchema: { options },
        schemaTypeName,
        name
      } = props

      return {
        ...props,
        inputComponent: 'select',
        children: components.mapSelectOptions(
          schemaTypeName,
          name,
          options
        )
      }
    }
  },
  radios: {
    component: components.Input,
    props: props => {
      return {
        ...props,
        inputComponent: components.Radio,
        children: components.mapRadioOptions(props)
      }
    }
  },
  boolean: {
    component: components.Input,
    props: props => ({
      ...props,
      inputComponent: components.Checkbox,
      labelOverride: ''
    })
  }
}
