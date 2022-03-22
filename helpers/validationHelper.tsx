import { Schemas } from '../types/_schemas'

import Joi from 'joi'

/**
 * convert joi any.required error into missing_parameter error
 *
 * @param {Joi.ValidationErrorItem} error - joi validaton error
 * @returns {Error} - A valid cresh error.
 */
const requiredErrorMap = (
  error: Joi.ValidationErrorItem,
): Error => new Error(`Parameter ${error.path} is missing`)

/**
 * convert joi any.only type error into invalid parameter error
 *
 * @param {Joi.ValidationErrorItem} error - joi validaton error
 * @param {string} [requestedType] - forced requested type
 * @returns {Error} - A valid cresh error.
 */
const typeErrorMap = (
  error: Joi.ValidationErrorItem,
  requestedType?: string,
): Error => {
  const type = requestedType ?? (error.context?.valids?.join('|') ?? '')
  const value = error.context?.value ?? ''
  
  return new Error(`Invalid parameter type named ${error.path} for column ${type} whith value "${value}"`)
}

/**
 * joi validation error mapping
 *
 * @param {Joi.ValidationError} errors - joi validation error
 * @returns {Array<Error>} - array of bad_request errors
 */
const errorsMapper = (
  errors: Joi.ValidationError,
): Array<Error> => {
  type ErrorMapper = (error: Joi.ValidationErrorItem) => Error
  const funcMap: Record<string, ErrorMapper> = {
    'any.required': requiredErrorMap,
    'any.only': typeErrorMap,
    'string.email': error => typeErrorMap(error, 'email'),
    'string.base': error => typeErrorMap(error, 'string'),
    'number.base': error => typeErrorMap(error, 'number'),
    'number.integer': error => typeErrorMap(error, 'integer'),
  }
  
  return errors.details.map((error: Joi.ValidationErrorItem) => (
    (error.type in funcMap)
      ? funcMap[error.type](error)
      : new Error(`invalid_parameter: ${error.message}`)
  ))
}

const validationHandler = (
  data: Record<string, unknown> | undefined,
  type: Schemas,
  schema: any,
): undefined => {
  let errors
  const { error } = schema.validate(
    data,
    { abortEarly: false },
  )
  if (error && error.isJoi) {
    errors = errorsMapper(error)
  }
  return errors
}

export default validationHandler
