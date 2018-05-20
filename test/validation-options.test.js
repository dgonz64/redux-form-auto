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


