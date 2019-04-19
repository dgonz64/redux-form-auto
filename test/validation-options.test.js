const { Schema } = require('../src/schema')

const schema = new Schema('owner', {
  color: {
    type: 'select',
    options: ['red', 'blue']
  }
})


test('allows blank', () => {
  const result = schema.validate({})

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})


test('accepts allowed complex value', () => {
  const complexSchema = new Schema('complexOwner', {
    color: {
      type: 'select',
      options: [
        { label: 'red', value: 'r' },
        { label: 'blue', value: 'b' }
      ]
    }
  })

  const result = complexSchema.validate({
    color: 'r',
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})


test('accepts functions as options', () => {
  const dynamicSchema = new Schema('dynamicOwner', {
    color: {
      type: 'select',
      options: props => {
        return props.colors.map(({ id, name }) => ({
          value: id,
          label: name
        }))
      }
    }
  })

  const result = dynamicSchema.validate({
    color: 'r',
  }, {
    colors: [
      { id: 'r', name: 'red' },
      { id: 'b', name: 'blue' }
    ]
  })
})

test('accepts allowed value', () => {
  const result = schema.validate({
    color: 'red',
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})


test('rejects unallowed value', () => {
  const result = schema.validate({
    color: '#00ff00',
  })

  expect(result).toEqual({
    errors: {
      color: {
        _translatable: true,
        msg: 'error.options',
        msgData: { options: ['red', 'blue'] }
      }
    },
    valid: false,
    warnings: {}
  })
})


test('rejects positive regex when not match', () => {
  const result = schema.validate({
    byez: 'Hasta luego, Lucas',
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})


