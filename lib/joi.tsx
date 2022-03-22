import Joi from 'joi'
import xss from 'xss'

const joiCustom = Joi.extend(
  {
    type: /.*/,
    rules: {
      optionalize: {
        method (): Joi.AnySchema {
          return (this as Joi.AnySchema).alter({
            optionalize: (schema: Joi.Schema) => {
              if (typeof this === 'string') {
                return schema.optional().allow(null, '')
              }
              return schema.optional().allow(null)
            },
          })
        },
      },
    },
  },
  {
    type: /.*/,
    messages: {
      'xss.detected': '{{#label}} contains XSS vulnerability. Unable to send request.',
    },
    rules: {
      xss: {
        validate (value, helpers): Joi.AnySchema {
          const type = typeof value
          
          if (type === 'string') {
            const secureValue = xss(value)
            if (secureValue !== value) return helpers.error('xss.detected')
          }
          return value
        },
      },
    },
  },
  {
    type: /.*/,
    messages: {
      'birthdate.invalid_date': '{{#label}} is not a valid date',
      'birthdate.too_young': 'customer must be at least 18 years old',
      'birthdate.too_old': 'customer is unlikely 110 years old',
    },
    rules: {
      birthdate: {
        validate (value, helpers): Joi.AnySchema {
          const now = Date.now()
          const maxDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18)) // go back by 18 years
          const minDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 110)) // go back 110 years
          const date = new Date(value)
          
          if (Object.prototype.toString.call(date) === '[object Date]') {
            // it is a date
            if (Number.isNaN(date.getTime())) { // d.valueOf() could also work
              // date is not valid
              return helpers.error('birthdate.invalid_date')
            }
            // date is valid
            if (date.getTime() > maxDate.getTime()) {
              return helpers.error('birthdate.too_young')
            }
            if (date.getTime() < minDate.getTime()) {
              return helpers.error('birthdate.too_old')
            }
            return value
          }
          // not a date
          return helpers.error('birthdate.invalid_date')
        },
      },
    },
  },
  {
    type: /.*/,
    messages: {
      'phoneNumber.invalid': '{{#label}} with value "{{#value}}" is not an accepted phone number',
    },
    rules: {
      phoneNumber: {
        validate (value, helpers): Joi.AnySchema {
          if (value.match(/^0([1-7])\d{8}$/)) return value
          return helpers.error('phoneNumber.invalid')
        },
      },
    },
  },
)

export default joiCustom
