import * as components from './components/index'
import { InputWrap } from './wrappers/InputWrap'
import { InputArrayWrap } from './wrappers/InputArrayWrap'

import { InputArrayPanel } from './components/InputArrayPanel'
import { InputArrayTable } from './components/InputArrayTable'
import { BSInputWrapper } from './components/BSInputWrapper'

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
    component: InputWrap,
    props: {
      inputWrapper: BSInputWrapper,
      inputComponent: 'input'
    }
  },
  number: {
    component: InputWrap,
    props: {
      inputWrapper: BSInputWrapper,
      inputComponent: 'input',
      type: 'number',
      parse: value => Number(value)
    }
  },
  array: {
    component: InputArrayWrap,
    props: props => {
      const {
        config = {},
        fieldSchema: { type }
      } = props

      const { arrayMode } = config
      const arrayHandler = arrayMode == 'table' ?
        InputArrayTable : InputArrayPanel

      return {
        ...props,
        arrayHandler,
        children: renderInputs({ schema: type[0], config })
      }
    }
  },
  schema: {
    component: components.Submodel,
  },
  select: {
    component: InputWrap,
    props: props => {
      const {
        fieldSchema: { options },
        schemaTypeName,
        name
      } = props

      return {
        ...props,
        inputWrapper: BSInputWrapper,
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
    component: InputWrap,
    props: props => {
      return {
        ...props,
        inputWrapper: BSInputWrapper,
        inputComponent: components.Radio,
        children: components.mapRadioOptions(props)
      }
    }
  },
  boolean: {
    component: InputWrap,
    props: props => ({
      ...props,
      inputWrapper: BSInputWrapper,
      inputComponent: components.Checkbox,
      labelOverride: ''
    })
  }
}
