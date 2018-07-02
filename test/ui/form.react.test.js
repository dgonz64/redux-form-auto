import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import config from './enzymeConfig'

import {
  Schema,
  Autoform,
  addSkinType,
  setLanguageByName
} from '../../src/index'

import { App } from './app'

const pet = new Schema('pet', {
  name: {
    type: String,
    error: {
      max: 4
    }
  }
})

const owner = new Schema('owner', {
  pet: {
    type: pet,
  },
  pets: {
    type: [pet]
  },
  carSize: {
    type: 'select',
    options: ['single', 'normal', 'bus driver']
  },
  gender: {
    type: 'radios',
    options: ['male', 'female', 'both']
  },
  goodBoy: {
    type: 'boolean'
  }
})

test('basic tests in input', () => {
  const initially = {
    pet: {
      name: 'Print Screen'
    },
    pets: [{
      name: 'Bobo'
    }]
  }

  const app = mount(
    <App>
      <Autoform schema={owner} form="owner" initialValues={initially} />
    </App>
  )

  // Some random lazy-fuck tests
  // console.log(app.html())
  const form = app.find('form')
  const labels = form.find('label')
  const inputs = form.find('input')
  const petName = form.find('input[name="pet.name"]')

  expect(form).toHaveLength(1)
  expect(labels).toHaveLength(5)
  expect(inputs).toHaveLength(6)

  const label = labels.first()
  expect(label.contains('models.pet.name._field')).toBe(true)
  expect(label.hasClass('control-label')).toBe(true)
  expect(petName.prop('name')).toBe('pet.name')
  expect(petName.prop('type')).toBe('text')
  expect(petName.prop('value')).toBe('Print Screen')
  expect(petName.hasClass('form-control')).toBe(true)

  const pet0Name = form.find('input[name="pets[0].name"]')
  expect(pet0Name).toHaveLength(1)

  const carSizes = form.find('select[name="carSize"] option')
  expect(carSizes).toHaveLength(3)

  const genders = form.find('input[name="gender"]')
  expect(genders).toHaveLength(3)

  const gender = genders.first()
  expect(gender.prop('type')).toBe('radio')

  const good = form.find('input[name="goodBoy"]')
  expect(good).toHaveLength(1)
  expect(good.prop('type')).toBe('checkbox')
})
