import { en, es } from './translations'
import {
  tr,
  setLanguage
} from './translate'
import { trPath } from './utils'

const defLangs = { en, es }

/**
 * Fully translates objects returned by validators
 *
 * @param {object} msgs Object with errors
 *    or warnings.
 * @returns {object} Messages translated for
 *    use with ReduxForm.
 */
const translateMsgs = msgs => {
  const fields = Object.keys(msgs)
  const starting = Array.isArray(msgs) ? [] : {}
  return fields.reduce((obj, field) => {
    let result
    const value = msgs[field]
    if (value) {
      if (typeof value == 'object') {
        if (value._translatable)
          result = tr(value.msg, value.msgData)
        else
          result = translateMsgs(value)
      } else
        result = value

      obj[field] = result
    }

    return obj
  }, starting)
}

/**
 * Creates a validator that automatically translates
 * the messages.
 *
 * @param {validator} validator Validator
 * @returns {object}
 */
const createTranslatedValidator = validator =>
  (model, props) => {
    const msgs = validator(model, props)
    return translateMsgs(msgs)
  }

/**
 * Creates a validator that automatically translates
 * errors.
 *
 * @param {Schema} schema Schema instance
 * @returns {validator}
 */
export const createTranslatedErrorValidator = schema =>
  createTranslatedValidator(schema.validators.error)

/**
 * Creates a validator that automatically translates
 * warnings.
 *
 * @param {Schema} schema Schema instance
 * @returns {validator}
 */
export const createTranslatedWarningValidator = schema =>
  createTranslatedValidator(schema.validators.warning)

/**
 * Loads a language from the languages table.
 *
 * @param {string} name Language code as in 'en' or 'fr'.
 */
export const setLanguageByName = name => {
  if (name in defLangs)
    setLanguage(defLangs[name])
}

/**
 * Multipurpose semantic-ish translation.
 *
 * @param {string} model Object name, usually what
 *    you pass as the first parameter when you create
 *    the schema.
 * @param {string} field Field name
 * @param {string} op Thing that varies based on
 *    the type.
 */
export const trModel = (model, field, op) =>
  tr(trPath(model, field, op))

