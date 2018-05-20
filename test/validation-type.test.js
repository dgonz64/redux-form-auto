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
  name: {
    type: String
  },
  age: {
    type: 'integer'
  },
  favourite: {
    type: pet,
    required: true
  },
  alter: {
    type: pet
  },
  pets: {
    type: [pet]
  }
})

test('missing values are ok for subschemas', () => {
  const result = schema.validate({
    favourite: { name: 'Yo' }
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})

test('mismatch integer should fail', () => {
  const result = schema.validate({
    name: 'I am a name',
    age: 'Twenty',
    favourite: { name: 'Vega' },
    alter: { name: 'Iso' }
  })

  expect(result).toEqual({
    errors: {
      age: {
        _translatable: true,
        msg: 'error.type',
        msgData: { type: 'integer' }
      },
    },
    valid: false,
    warnings: {}
  })
})

test('mismatch type string should fail', () => {
  const result = schema.validate({
    name: 10,
    age: 20,
    favourite: { name: 'Vega' },
    alter: { name: 'Iso' }
  })

  expect(result).toEqual({
    errors: {
      name: {
        _translatable: true,
        msg: 'error.type',
        msgData: { type: 'string' }
      }
    },
    valid: false,
    warnings: {}
  })
})

test('correct model should pass', () => {
  const result = schema.validate({
    name: 'I am a name',
    age: 20,
    registered: true,
    favourite: { name: 'Vega' },
    alter: { name: 'Iso' }
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})

test('missing non required values (alter) are ok', () => {
  const result = schema.validate({
    name: 'I am a name',
    age: 20,
    registered: true,
    favourite: { name: 'Popo' }
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})

test('should fail because it has no favorite pet', () => {
  const result = schema.validate({
    name: 'I am a name',
    age: 20,
    registered: true
  })

  expect(result).toEqual({
    errors: {
      favourite: {
        _translatable: true,
        msg: 'error.required',
        msgData: { required: true }
      }
    },
    valid: false,
    warnings: {}
  })
})

test('lets you have no element when type is array', () => {
  const result = schema.validate({
    name: 'Soy un nombre',
    favourite: { name: 'Popo' }
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})

test('correctly validates array types', () => {
  const result = schema.validate({
    name: 'I am a name',
    favourite: { name: 'Papa' },
    pets: [
      { name: 'Pepepepe' },
      { name: 'Papa' },
      { name: 'Pipi' }
    ]
  })

  expect(result).toEqual({
    errors: {
      pets: [
        {
          name: {
            _translatable: true,
            msg: 'error.max',
            msgData: { max: 4 }
          }
        },
      ]
    },
    valid: false,
    warnings: {}
  })
})

test('correctly validates array types skipping first', () => {
  const result = schema.validate({
    name: 'I am a name',
    favourite: { name: 'Papa' },
    pets: [
      { name: 'Papa' },
      { name: 'Pepepepe' },
      { name: 'Pipi' }
    ]
  })

  expect(result).toEqual({
    errors: {
      pets: [
        {},
        {
          name: {
            _translatable: true,
            msg: 'error.max',
            msgData: { max: 4 }
          }
        },
      ]
    },
    valid: false,
    warnings: {}
  })
})

test('invalidates incorrect subschema type', () => {
  const result = schema.validate({
    name: 'Me by myself',
    favourite: 'Me by myself'
  })

  expect(result).toEqual({
    errors: {
      favourite: {
        _translatable: true,
        msg: 'error.type',
        msgData: { type: 'pet' }
      }
    },
    valid: false,
    warnings: {}
  })
})

test('finds errors inside subschemas', () => {
  const result = schema.validate({
    favourite: {
      name: 'Something really long'
    }
  })

  expect(result).toEqual({
    errors: {
      favourite: {
        name: {
          _translatable: true,
          msg: 'error.max',
          msgData: { max: 4 }
        }
      }
    },
    valid: false,
    warnings: {}
  })
})
