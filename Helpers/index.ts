import Joi from 'joi';

export const RegisterSchema = Joi.object({
  Name: Joi.string().required(),
  Email: Joi.string().required().email().messages({
    'string.empty': 'Please enter an Email',
    'string.email': 'Please enter a valid email',
  }),
  Password: Joi.string().required().pattern(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*]).{8,}$')
  ),
  isAdmin: Joi.number().integer().required()
});
