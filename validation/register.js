const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (
    Validator.isEmpty(data.name) ||
    !Validator.isLength(data.name, { min: 2, max: 30 })
  ) {
    errors.name = 'Name is required and must be between 2 and 3 characters.';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (
    Validator.isEmpty(data.password) ||
    !Validator.isLength(data.password, { min: 6, max: 30 })
  ) {
    errors.password =
      'Password is required and must be between 6 and 30 characters';
  }

  if (
    Validator.isEmpty(data.password2) ||
    !Validator.isLength(data.password2, { min: 6, max: 30 })
  ) {
    errors.password2 =
      'Confirmation Password is required and must be between 6 and 30 characters';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return { errors, isValid: isEmpty(errors) };
};
