const { Schema } = require('../src/schema')

const schema = new Schema('owner', {
  name: {
    type: 'string',
    error: {
      min: 3,
      max: 5
    }
  },
})

test('correct length should pass', () => {
  const result = schema.validate({
    name: 'Hello',
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})

test('short string should fail', () => {
  const result = schema.validate({
    name: 'Hi',
  })

  expect(result).toEqual({
    errors: {
      name: {
        _translatable: true,
        msg: 'error.min',
        msgData: { min: 3 }
      }
    },
    valid: false,
    warnings: {}
  })
})

test('long string should fail', () => {
  const result = schema.validate({
    name: 'See you soon',
  })

  expect(result).toEqual({
    errors: {
      name: {
        _translatable: true,
        msg: 'error.max',
        msgData: { max: 5 }
      }
    },
    valid: false,
    warnings: {}
  })
})
