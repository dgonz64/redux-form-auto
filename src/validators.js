import { Schema } from './schema'
import {
  schemaType,
  getType
} from './utils'

/**
 * Validation creators for some types.
 */
export const specialTypes = {
  integer: value => value && !Number.isInteger(value),
  select: value => value && typeof value != 'string',
  radios: value => value && typeof value != 'string',
  password: value => value && typeof value != 'string'
}

/**
 * Adds a special type validation
 *
 * @param {string} type Type validated
 * @param {function} validator value => true_to_fail
 *    validator
 */
export const addSpecialTypeValidator = (type, validator) => {
  specialTypes[type] = validator
}

/**
 * Translates ArrayField error for ReduxForm
 *
 * @param {string} kind Error type
 * @param {string} error Error message
 *
 * @returns {object|string} Error message
 */
export const errorReport = (kind, error) => {
  switch (kind) {
  case 'minChildren':
  case 'maxChildren':
    return { _error: error }
  default:
    return error
  }
}

/**
 * Error creators with the validator factories.
 */
export const testFactory = {
  type: entry => {
    const { type } = entry

    if (type instanceof Schema) {
      return (value, validationType) => {
        if (value) {
          if (typeof value == 'object')
            return type.validateType(value, validationType)
          else
            return validationType == 'error'
        } else
          return false
      }
    } else if (Array.isArray(type)) {
      const schema = type[0]

      return (value, validationType) => {
        if (value && Array.isArray(value)) {
          return value.map(child =>
            schema.validateType(
              child,
              validationType
            )
          )
        } else
          return false
      }
    } else {
      const typeStr = schemaType(type)
      const tester = specialTypes[typeStr]
      return (value, validationType) => {
        // We don't want to complain in the warn pass
        if (value && validationType == 'error') {
          if (tester)
            return tester(value)
          else
            return getType(value) != typeStr
        } else
          return false
      }
    }
  },
  min: entry =>
    value => value && value.length < entry.min,
  max: entry =>
    value => value && value.length > entry.max,
  required: entry =>
    value => !Boolean(value),
  minChildren: entry =>
    value => 
    !Array.isArray(value) ||
     value.length < (entry.minChildren || 0),
  maxChildren: entry =>
    value =>
     !Array.isArray(value) ||
      (entry.maxChildren && value.length > entry.maxChildren),
  validation: entry =>
    value =>
     entry.validation(value, entry),
  accept: entry =>
    value => value ?
     !entry.accept.test(value) : false,
  reject: entry =>
    value => value && typeof value == 'string' ?
     entry.reject.test(value) : false,
  options: entry =>
    value => value && entry.options.indexOf(value) == -1
}

/**
 * Validator. Accepts a value and returns validation result.
 *
 * @typedef {function} validator
 * @param {any} value Value to be validated
 *
 * @returns {boolean|translatable|string} ``true`` if validation fails.
 *    If it's a string, the value will be printed directly,
 *    untranslated to the input. If the value is an object,
 *    it's considered a translatable.
 */

/**
 * Creates a specific validator.
 *
 * @typedef {function} validatorConstructor
 * @param {entry} A Schema specification for a field.
 *
 * @returns {validator}
 */

/**
 * Adds a test creator to the testFactory table, that way you can
 * use your own custom validations.
 *
 * @param {string} validationName The validation name for the
 *    test being created.
 * @param {validatorConstructor} validation Function that takes
 *    the entry and creates a validator to be used later.
 */
export const addValidator = (validationName, validation) => {
  testFactory[validationName] = validation
}
