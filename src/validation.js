import {
  arrayTrim,
  objectIsEmpty
} from './utils'
import { errorReport } from './validators'

/**
 * Translatable intermediary object.
 *
 * @typedef {object} translatableObject
 *
 * @property {boolean} _translatable Always ``true``, used to
 *    identify translations in the results object.
 * @property {string} msg Id for the message in the translation
 *    table.
 * @property {object} msgData Data passed to the tr() function
 *    to provide variable substitution for the string.
 */

/**
 * Creates a translatable object.
 *
 * @param {string} msg Id for the message
 * @param {object} msgData Object for variable substitution
 *
 * @returns {translatableObject} Object to be translated elsewhere.
 */
export const translatable = (msg, msgData) => {
  const result = !objectIsEmpty(msgData) ?
    { msg, msgData } : { msg }

  return Object.assign(result, { _translatable: true })
}

const validateEntry = ({
  validationType,
  value,
  validations,
}) =>
  validations.reduce((msg, validation) => {
    if (msg) {
      return msg
    } else {
      const validator = validation.test
      const result = validator(value, validationType)
      const trimmed = arrayTrim(result)
      if (trimmed) {
        if (typeof trimmed == 'boolean') {
          const { kind, msgData } = validation
          const msgId = `${validationType}.${kind}`
          const error = translatable(msgId, msgData)
          return errorReport(kind, error)
        } else if (objectIsEmpty(trimmed))
          return msg
        else if (typeof trimmed == 'string')
          return translatable(trimmed)
        else
          return trimmed
      } else {
        return msg
      }
    }
  }, null)

/**
 * Validates a document using some validators and
 * a strategy.
 *
 * @param {object} doc Document to validate
 * @param {object} validationsByKey Object with the
 *    validators stored by field
 * @param {string} validationType 'error' or 'warning'
 *
 * @returns {object} Validation messages for ReduxForm.
 */
export const validate = ({
  model,
  validationsByKey,
  validationType
}) => {
  const keys = Object.keys(validationsByKey)
  return keys.reduce((messages, key) => {
    const validations = validationsByKey[key]
    const msg = validateEntry({
      validations,
      value: model[key],
      validationType
    })

    if (msg && !objectIsEmpty(msg))
      messages[key] = msg

    return messages
  }, {})
}

/**
 * Function that validates a document and produces
 * a translated or untranslated tree depending on
 * how it was created.
 *
 * @callback validator
 * @param {object} values Document
 *
 * @returns Tree with (translated or not) error or
 *    warning messages.
 */
