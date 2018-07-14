import React, { PureComponent } from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

import { setLanguageByName } from '../../src/translation_utils'
import config from './enzymeConfig'
import {
  Schema,
  Autoform,
  InputWrap,
  FieldPropsOverride
} from '../../src/index'

import { App } from './app'

const custom = new Schema('custom', {
  name: {
    type: 'string',
  }
})

test('be able to override specific field props', () => {
  const app = mount(
    <App>
      <Autoform schema={custom}>
        <FieldPropsOverride
          name="name"
          className="custom-class"
        />
      </Autoform>
    </App>
  )

  // console.log(app.html())

  const form = app.find('form')
  const inputs = form.find('input')

  expect(inputs).toHaveLength(1)
  const input = inputs.first()
  expect(input.hasClass('custom-class')).toBe(true)
})

const parent = new Schema('parent', {
  child: {
    type: [custom]
  }
})

test('be able to reference child elements', () => {
  const app = mount(
    <App>
      <Autoform schema={parent}>
        <FieldPropsOverride
          name="child.name"
          className="custom-class"
        />
      </Autoform>
    </App>
  )

  app.find('span.glyphicon-plus').simulate('click')
  // console.log(app.html())

  const form = app.find('form')
  const inputs = form.find('input')

  expect(inputs).toHaveLength(1)
  const input = inputs.first()
  expect(input.hasClass('custom-class')).toBe(true)
})
