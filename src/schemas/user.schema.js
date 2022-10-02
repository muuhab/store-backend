import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(40)
    .regex(/^[a-z ,.']+$/i)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .messages({
      "object.regex":
        "Minimum eight characters, at least one letter and one number",
    }),
});

export default userSchema;
