const Joi = require("joi");

const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};
// 👇 New for profile update
const updateProfileValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).optional(),
    lastName: Joi.string().max(50).optional(),
    dob: Joi.date().iso().optional(), // accepts YYYY-MM-DD
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .message("Please enter a valid 10-digit mobile number")
      .optional(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};
module.exports = {
  registerValidation,
  loginValidation,
  updateProfileValidation,
};
