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
  pets: {
    type: [pet],
    minChildren: 1,
    maxChildren: 4
  }
})

const someChild = { name: 'Yo' }

test('works within range', () => {
  const result = schema.validate({
    pets: [
      someChild,
      someChild,
      someChild
    ]
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})

test('rejects when less than minChildren', () => {
  const result = schema.validate({
    pets: []
  })

  expect(result).toEqual({
    errors: {
      pets: {
        _error: {
          _translatable: true,
          msg: 'error.minChildren',
          msgData: { minChildren: 1 }
        }
      },
    },
    valid: false,
    warnings: {}
  })
})

test('rejects when missing value because that is considered zero children', () => {
  const result = schema.validate({})

  expect(result).toEqual({
    errors: {
      pets: {
        _error: {
          _translatable: true,
          msg: 'error.minChildren',
          msgData: { minChildren: 1 }
        }
      },
    },
    valid: false,
    warnings: {}
  })
})

test('rejects when more than maxChildren', () => {
  const result = schema.validate({
    pets: [
      someChild, someChild, someChild,
      someChild, someChild, someChild
    ]
  })

  expect(result).toEqual({
    errors: {
      pets: {
        _error: {
          _translatable: true,
          msg: 'error.maxChildren',
          msgData: { maxChildren: 4 }
        }
      }
    },
    valid: false,
    warnings: {}
  })
})
