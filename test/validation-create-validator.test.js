const {
  Schema,
  translatable,
  addValidator
} = require('../src/index')

addValidator('divisibleBy', entry => {
  return value => value % entry.divisibleBy != 0
})

const schema = new Schema('thing', {
  number: {
    type: 'number',
    divisibleBy: 3
  }
})

test('passes divisible by 3', () => {
  const result = schema.validate({
    number: 6 
  })

  expect(result).toEqual({
    errors: {},
    valid: true,
    warnings: {}
  })
})


test('failing non divisible', () => {
  const result = schema.validate({
    number: 5
  })

  expect(result).toEqual({
    errors: {
      number: {
        _translatable: true,
        msg: 'error.divisibleBy',
        msgData: {
          divisibleBy: 3
        }
      }
    },
    valid: false,
    warnings: {}
  })
})
