import { Schema } from './schema'
import { validate } from './validation'
import {
  forceArray,
  schemaType
} from './utils'
import { testFactory } from './validators.js'

/**
 * Extracts message data based on a validation
 * test in the schema.
 *
 * @param {string} kind Type of the field
 * @param {object} entry 
 *
 * @returns {object} Data for the message translation.
 */
const extractMsgData = (kind, entry) => {
  const data = entry[kind]

  switch (kind) {
  case 'type':
    if (data instanceof Schema)
      return { [kind]: data.getType() }
    else
      return { [kind]: schemaType(data) }
  case 'validation':
  case 'accept':
  case 'reject':
    return {}
  default:
    return {
      [kind]: data
    }
  }
}

/**
 * Creates all the needed tests for a configuration
 * block by comparing each attribute with the existing
 * test creators.
 *
 * @param {object} entry Object with the validation tests.
 *
 * @returns {array} All the tests created and ready.
 */
const createTesters = (entry) => {
  const entryKeys = Object.keys(entry)
  return entryKeys.reduce((tests, kind) => {
    const creator = testFactory[kind]

    if (creator) {
      const test = creator(entry)
      const msgData = extractMsgData(kind, entry)

      return [
        ...tests,
        {
          kind,
          test,
          msgData
        }
      ]
    } else {
      return tests
    }
  }, [])
}

/**
 * Extracts an entry or list of entries to generate
 * a flat array with the needed tests already created.
 *
 * @param {object|array} Test block or list of tests blocks
 *    used to generate the validation tests.
 *
 * @returns {array} All the tests created and ready.
 */
const extract = entry => {
  if (entry) {
    const tests = forceArray(entry)

    return tests.reduce((tests, entry) => {
      return [...tests, ...createTesters(entry)]
    }, [])
  } else {
    return []
  }
}

/**
 * Extracts just the error validations. That can
 * happen in the same schema block as the field
 * or in an object in the error attribute.
 *
 * @param {object} entry Schema entry.
 *
 * @returns {array} Tests created and ready.
 */
const extractErrorer = entry => {
  return [
    // Extract type condition
    ...extract(entry),

    // Extract conditions block
    ...extract(entry.error)
  ]
}

/**
 * Extracts just the warning block
 */
const extractWarner = entry => {
  return [
    // Validate the type in order to navigate
    // through subschemas
    ...extract({ type: entry.type }),

    // The actual warnings
    ...extract(entry.warning)
  ]
}

/**
 * Bridge to extract the desired validations.
 *
 * @param {object} schema Schema
 * @param {extractorCallback} extractor Function used
 *    to select what to extract and extract it.
 *
 * @returns {array} Validated tests ready for use.
 */
const extractValidations = (schema, extractor) => {
  const keys = Object.keys(schema)
  return keys.reduce((validators, key) => {
    const entry = schema[key]
    validators[key] = extractor(entry)

    return validators
  }, {})
}

/**
 * Callback for extracting validation tests.
 *
 * @callback extractorCallback
 * @param {object} entry Schema data
 */

/**
 * Creates the validation code for an schema using
 * a extractor.
 *
 * @param {object} schema Schema data
 * @param {extractorCallback} extractor Select and
 *    extract.
 */
const createValidators = ({
  schema,
  extractor,
  validationType
}) => {
  const validationsByKey = extractValidations(schema, extractor)
  extractor.validationType = validationType

  return (model, props) => {
    const validation = validate({
      model,
      validationsByKey,
      validationType,
      props
    })
    return validation
  }
}

/**
 * Extracts only the error validators.
 *
 * @param {object} schema Schema data.
 *
 * @returns {array} Validators
 */
export const createErrorValidators = schema =>
  createValidators({
    schema,
    extractor: extractErrorer,
    validationType: 'error'
  })

/**
 * Extracts only the warning validators.
 *
 * @param {object} schema Schema data
 */
export const createWarningValidators = schema =>
  createValidators({
    schema,
    extractor: extractWarner,
    validationType: 'warning'
  })

