import Joi from "joi";

export const authValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().required(),
  password: Joi.string().required(),
});

export const generateOTP = () =>
  String(Math.floor(Math.random() * 1e6)).padStart(6, "0");
