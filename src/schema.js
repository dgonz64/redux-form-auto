import {
  createErrorValidators,
  createWarningValidators,
} from './extraction'
export { regexes } from './regexes'
export { translatable } from './validation'
import {
  setLanguageByName,
  createTranslatedErrorValidator,
  createTranslatedWarningValidator
} from './translation_utils'

/**
 * Contains the schema specifications and automatically
 * creates validation code for errors and warnings, both
 * translated and untranslated.
 */
export class Schema {
  /**
   * Creates a Schema from the specification.
   *
   * @param {string} typeName Name of the model being created.
   *    It can be chosen freely.
   * @param {object} schema Schema specification.
   */
  constructor(typeName, schema) {
    this.schema = schema
    this.typeName = typeName

    this.validators = {
      error: createErrorValidators(this.schema),
      warning: createWarningValidators(this.schema)
    }

    this.translated = {
      error: createTranslatedErrorValidator(this),
      warning: createTranslatedWarningValidator(this)
    }
  }

  /**
   * Returns the schema specification.
   *
   * @returns {object} Schema specification.
   */
  getSchema() {
    return this.schema
  }

  /**
   * Returns schema specification for a field.
   *
   * @returns {object} Field specification.
   */
  getFieldSchema(name) {
    return this.schema[name]
  }

  /**
   * Returns the schema name.
   *
   * @returns {string} Schema name (also called ``typeName``).
   */
  getType() {
    return this.typeName
  }

  /**
   * Gets error validator that produces a translatable
   * tree with the found errors.
   *
   * @returns {validator} Drop in validator
   *
   * @see getTranslatedErrorValidator
   */
  getErrorValidator() {
    return this.validators.error
  }

  /**
   * Gets warning validator that produces a translatable
   * tree with the found warnings.
   *
   * @returns {validator} Drop in validator
   *
   * @see getTranslatedWarningValidator
   */
  getWarningValidator() {
    return this.validators.warning
  }

  /**
   * Gets the translated errors validator for direct
   * use with ReduxForm.
   *
   * @returns {validator} Drop in validator
   */
  getTranslatedErrorValidator() {
    return this.translated.error
  }

  /**
   * Gets the translated warnings validator for direct
   * use with ReduxForm.
   *
   * @returns {validator} Drop in validator
   */
  getTranslatedWarningValidator() {
    return this.translated.warning
  }

  /**
   * Validates using the specified validator type
   * (error or warning)
   *
   * @param {object} doc Document to validate
   * @param {string} validationType 'error' or 'warning'
   *
   * @returns {object} Validation tree
   */
  validateType(doc, validationType) {
    const validator = this.validators[validationType]

    return validator(doc)
  }

  /**
   * Information returned by validate()
   *
   * @typedef {object} validationResult
   * @property {boolean} valid States if the document
   *    is valid (no errors).
   * @property {object} errors Translatable object
   *    with the errors.
   * @property {object} warnings Translatable object
   *    with the warnings.
   */

  /**
   * Validates a document and returns an information
   * object about the results.
   *
   * @param {object} doc Document to validate
   *
   * @returns {validationResult}
   */
  validate(doc) {
    const errors = this.validateType(doc, 'error')
    const warnings = this.validateType(doc, 'warning')

    return {
      valid: Object.keys(errors).length == 0,
      errors,
      warnings
    }
  }

  /**
   * Returns true if the document is valid following
   * the schema.
   *
   * @returns {boolean} Validity
   */
  isValid(doc) {
    const errors = this.validateType(doc, 'error')
    return Object.keys(errors).length == 0
  }
}
