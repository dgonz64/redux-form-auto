const { Schema } = require('../src/schema')

const pet = new Schema('pet', {
  name: {
    type: String,
    error: {
      max: 4
    }
  }
})

const schema = new Schema('owner', {
  pet: {
    type: pet
  }
})

test('passing submodel form field', () => {
  const result = schema.validate({
    pet: {
      name: 'Dudu'
    }
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})

test('rejects submodel form than minChildren', () => {
  const result = schema.validate({
    pet: {
      name: 'Something long'
    }
  })

  expect(result).toEqual({
    errors: {
      pet: {
        name: {
          _translatable: true,
          msg: 'error.max',
          msgData: { max: 4 }
        }
      },
    },
    valid: false,
    warnings: {}
  })
})
