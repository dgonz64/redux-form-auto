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

class MyInput extends PureComponent {
  render() {
    return (
      <input
        {...this.props.input}
        className="fancy-class"
      />
    )
  }
}

addSkinType('thingy', {
  component: InputWrap,
  props: {
    inputWrapper: BSInputWrapper,
    inputComponent: MyInput
  }
})

const custom = new Schema('custom', {
  name: {
    type: 'thingy',
  }
})

test('custom type with UI', () => {
  const app = mount(
    <App>
      <Autoform schema={custom} />
    </App>
  )

  // console.log(app.html())

  const form = app.find('form')
  const inputs = form.find('input')

  expect(inputs).toHaveLength(1)
  const input = inputs.first()
  expect(input.hasClass('fancy-class')).toBe(true)
})
