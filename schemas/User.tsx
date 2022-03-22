import Joi from '../lib/joi'

export const userRegistrationSchema = Joi.object({
  username: Joi.string().min(3).max(15).xss().optional(),
  email: Joi.string().email({ tlds: {allow: false} }).required(),
  password: Joi.string().min(8).max(32).xss().required(),
}).required()

export const userLoginSchema = Joi.object({
  identifier: Joi.string().email({ tlds: {allow: false} }).xss().optional(),
  password: Joi.string().min(8).max(32).xss().required(),
}).required()

const schema = Joi.object({
  username: Joi.string().min(3).max(15).xss().optional(),
  email: Joi.string().email({ tlds: {allow: false} }).required(),
  password: Joi.string().min(8).max(32).xss().optional(),
  jwt: Joi.string().xss().optional(),
})

export default schema
