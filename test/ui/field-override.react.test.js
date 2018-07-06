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

test('custom type with UI', () => {
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
