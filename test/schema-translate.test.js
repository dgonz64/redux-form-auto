const { Schema } = require('../src/schema')
const { setLanguageByName } = require('../src/translation_utils')

setLanguageByName('en')

const schema = new Schema('owner', {
  name: {
    type: 'string',
    error: {
      max: 5
    }
  }
})

test('translates a model', () => {
  const validator = schema.getTranslatedErrorValidator()
  const result = validator({
    name: 'Too long, as usually'
  })

  expect(result).toEqual({
    name: 'Value should be less than 5 characters long'
  })
})
