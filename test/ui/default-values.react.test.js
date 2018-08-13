import React, { PureComponent } from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import { setLanguageByName } from '../../src/translation_utils'
import config from './enzymeConfig'
import {
  Schema,
  Autoform,
  addSkinType,
  InputWrap
} from '../../src/index'

import { BSInputWrapper } from '../../src/ui/components/BSInputWrapper'

import { App } from './app'

const defaulter = new Schema('defaulter', {
  name: {
    type: 'string',
    defaultValue: 'tomato'
  }
})

const uniparenter = new Schema('parenter', {
  defaulter: {
    type: defaulter
  }
})

const multiparenter = new Schema('multiparenter', {
  defaulter: {
    type: [defaulter]
  }
})

test('fields can have default values', () => {
  const app = mount(
    <App>
      <Autoform schema={defaulter} />
    </App>
  )

  // console.log(app.html())

  const form = app.find('form')
  const inputs = form.find('input')

  expect(inputs).toHaveLength(1)
  const input = inputs.first()
  expect(input.prop('value')).toBe('tomato')
})

test('embedded object can have default values', () => {
  const app = mount(
    <App>
      <Autoform schema={uniparenter} />
    </App>
  )

  // console.log(app.html())

  const form = app.find('form')
  const inputs = form.find('input')

  expect(inputs).toHaveLength(1)
  const input = inputs.first()
  expect(input.prop('value')).toBe('tomato')
})
