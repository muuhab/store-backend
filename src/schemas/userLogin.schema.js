import Joi from "joi";

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .messages({
      "object.regex":
        "Minimum eight characters, at least one upper case, one lower case, one number and one special character",
    }),
});

export default userLoginSchema;
