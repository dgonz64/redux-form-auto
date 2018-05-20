import { Schema } from './schema'

const getKind = thing => {
  if (Array.isArray(thing)) {
    return 'array'
  } else {
    return typeof thing
  }
}

/**
 * Returns the type of a value. That is
 * 'array' for an array, the name of the
 * schema for a Schema instance or, otherwise,
 * the javascript typeof of the value.
 *
 * @param {any} thing Value
 *
 * @returns {string} Type name.
 */
export const getType = thing => {
  const kind = getKind(thing)

  if (kind == 'object' && thing instanceof Schema)
    return thing.getType()
  else
    return kind
}

/**
 * Translates schema specification type. Types can
 * be specified with a string or a constructor like
 * String.
 *
 * @param {string|function} type Type specification.
 *
 * @returns {string} Type as string.
 */
export const schemaType = type => {
  if (typeof type == 'function')
    return typeof type()
  else
    return type
}

/**
 * Translates the schema's type specification. Type
 * can be specified as with schemaType and also can
 * be a subschema or an array of other schema.
 *
 * @param {any} type Can be:
 *    - String like 'number'
 *    - Constructor like Number
 *    - Schema instance
 *    - Array with schema instance in the first element.
 *        Example: [client]
 */
export const schemaTypeEx = type => {
  if (type instanceof Schema)
    return 'schema'
  else {
    const isArray = Array.isArray(type) 
    if (isArray && type.length > 0 && type[0] instanceof Schema)
      return 'array'
    else
      return schemaType(type)
  }
}

/**
 * If value is not an array, it returns an array
 * with it as the only element.
 *
 * @param {any} thing Value
 *
 * @returns {array} [thing]
 */
export const forceArray = thing =>
  Array.isArray(thing) ? thing : [thing]

/**
 * Says is an object is empty for the likes of
 * this library.
 *
 * @param {array|object} obj Object or array.
 *
 * @returns {boolean} true if the array is empty or
 *    the object doesn't have keys.
 */
export const objectIsEmpty = obj => {
  if (Array.isArray(obj)) {
    return obj.length == 0
  } else {
    return typeof obj == 'object' &&
      Object.keys(obj).length === 0 &&
      obj.constructor === Object
  }
}

/**
 * Removes successful fields from the message
 * arrays used in ReduxForm's FieldArray.
 *
 * @param {array} arr Array with the validation
 *    messages.
 *
 * @returns {array} Pruned array.
 */
export const arrayTrim = arr => {
  if (Array.isArray(arr)) {
    return arr.reduceRight((arr, msg) => {
      if (arr.length == 0 && objectIsEmpty(msg))
        return arr
      else
        return [ msg, ...arr]
    }, [])
  } else {
    return arr
  }
}

/**
 * Returns the last element of an array
 *
 * @params {array} arr Array
 *
 * @returns {any} Last element
 */
export const arrLast = arr => arr[arr.length - 1]

/**
 * Traverses an object. If a subobject doesn't exist,
 * it will return the default value.
 *
 * @param {object} obj Object to traverse
 * @param {array} path Path to traverse the object
 * @param {any} def Default value if subobject doesn't exist
 */
export const objectTraverse = (obj, path, def) => {
  const [ next, ...rest ] = path
  if (next in obj) {
    if (rest.length == 0)
      return obj[next]
    else
      return objectTraverse(obj[next], rest, def)
  } else
    return def
}

/**
 * Generates a model translation path.
 *
 * @param {string} model Name of the model (ie: 'client')
 * @param {string} field Name of the field
 * @param {string} op Name of the option or any subthing.
 *
 * @returns {string} id for the translation string
 */
export const trPath = (model, field, op) => {
  if (typeof op == 'undefined')
    return ['models', model, field].join('.')
  else
    return ['models', model, field, op].join('.')
}
