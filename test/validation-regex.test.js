const { Schema } = require('../src/schema')

const schema = new Schema('owner', {
  hello: {
    type: 'string',
    accept: /frie/
  },
  byez: {
    type: 'string',
    reject: /enem/
  },
})


test('accepts positive regex when matches', () => {
  const result = schema.validate({
    hello: 'Hello friends',
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})


test('rejects positive regex when not match', () => {
  const result = schema.validate({
    hello: 'Hello Friends',
  })

  expect(result).toEqual({
    errors: {
      hello: {
        _translatable: true,
        msg: 'error.accept'
      }
    },
    valid: false,
    warnings: {}
  })
})


test('accepts negative regex when matches', () => {
  const result = schema.validate({
    byez: 'Bye enemies',
  })

  expect(result).toEqual({
    errors: {
      byez: {
        _translatable: true,
        msg: 'error.reject'
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


