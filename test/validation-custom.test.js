const { Schema, translatable } = require('../src/schema')

const schema = new Schema('owner', {
  name: {
    type: 'string',
    validation: value => {
      switch (value) {
      case 'bool':
        return true
      case 'obj':
        return translatable('bad.obj')
      case 'str':
        return 'bad.str'
      default:
        return false
      }
    }

  },
  address: {
    type: 'string'
  },
})

test('passing custom validation', () => {
  const result = schema.validate({
    name: 'Antonio',
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})


test('failing custom replying boolean', () => {
  const result = schema.validate({
    name: 'bool',
  })

  expect(result).toEqual({
    errors: {
      name: {
        _translatable: true,
        msg: 'error.validation' 
      }
    },
    valid: false,
    warnings: {}
  })
})


test('failing custom replying string', () => {
  const result = schema.validate({
    name: 'str',
  })

  expect(result).toEqual({
    errors: {
      name: {
        _translatable: true,
        msg: 'bad.str'
      }
    },
    valid: false,
    warnings: {}
  })
})


test('failing custom replying object', () => {
  const result = schema.validate({
    name: 'obj',
  })

  expect(result).toEqual({
    errors: {
      name: {
        _translatable: true,
        msg: 'bad.obj'
      }
    },
    valid: false,
    warnings: {}
  })
})

