const { Schema } = require('../src/schema')

const pet = new Schema('pet', {
  age: {
    type: 'number',
    required: true
  }
})

const schema = new Schema('owner', {
  name: {
    type: 'string',
    required: true
  },
  address: {
    type: 'string'
  },
  pet: { type: pet },
  pets: { type: [pet] }
})

test('rejects missing value when required', () => {
  const result = schema.validate({
    address: '23 Puking Rainbow Pony Park',
  })

  expect(result).toEqual({
    errors: {
      name: {
        _translatable: true,
        msg: 'error.required',
        msgData: { required: true }
      }
    },
    valid: false,
    warnings: {}
  })
})


test('allows missing value when not required', () => {
  const result = schema.validate({
    name: 'David',
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})

test('rejects subschema missing value', () => {
  const result = schema.validate({
    name: 'David',
    pet: {}
  })

  expect(result).toEqual({
    errors: {
      pet: {
        age: {
          _translatable: true,
          msg: 'error.required',
          msgData: { required: true }
        }
      }
    },
    valid: false,
    warnings: {}
  })
})

test('rejects array missing value', () => {
  const result = schema.validate({
    name: 'David',
    pets: [{}]
  })

  expect(result).toEqual({
    errors: {
      pets: [{
        age: {
          _translatable: true,
          msg: 'error.required',
          msgData: { required: true }
        }
      }]
    },
    valid: false,
    warnings: {}
  })
})

